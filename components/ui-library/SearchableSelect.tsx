import cn from "classnames";
import { usePopper, useUUID } from "lib/juniper-hooks";
import React, { useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Check, ChevronDown, X } from "react-feather";
import Box from "ui-box";

interface Option {
  value: any;
  label: string;
}

interface SearchableSelectProps {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  options?: Option[];
  value?: any;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: any) => void;
  isNotClearable?: boolean;
  required?: boolean;
}

export function SearchableSelect({
  className,
  placeholder,
  disabled,
  options,
  value,
  onChange,
  isNotClearable,
  required,
}: SearchableSelectProps) {
  const {
    referenceElement,
    setReferenceElement,
    setPopperElement,
    styles,
    attributes,
  } = usePopper();
  const uuid = useUUID(4);

  const {
    inputRef,
    isFocused,
    filteredOptions,
    selectedOption,
    selectedOptionIdx,
    focusedOptionIdx,
    searchValue,
    handleInputChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleSelect,
    handleClear,
  } = useSearchableSelect(options ?? [], value, onChange);

  return (
    <Box
      className={cn(className, "jnpr-searchableSelect", {
        disabled: !!disabled,
      })}
      ref={setReferenceElement}
    >
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-controls={`combobox-list-:${uuid}:`}
        aria-expanded={isFocused}
        aria-autocomplete="both"
        aria-owns="results"
        aria-activedescendant={
          !selectedOption ? undefined : `combobox-option-${selectedOptionIdx}`
        }
        placeholder={placeholder || "Search..."}
        disabled={disabled}
        value={searchValue === null ? selectedOption?.label || "" : searchValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        required={required}
      />

      <div className="flex center gap-2">
        {!isNotClearable && value !== undefined && (
          <button
            className="jnpr-searchableSelect-iconButton"
            disabled={disabled}
            onClick={handleClear}
          >
            <X width={16} />
          </button>
        )}
        <button
          className="jnpr-searchableSelect-iconButton"
          disabled={disabled}
          tabIndex={-1}
        >
          <ChevronDown
            className="jnpr-searchableSelect-chevronIcon"
            width={16}
          />
        </button>
      </div>

      {typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <ul
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className={cn("jnpr-searchableSelect-optionContainer", {
              visible: isFocused,
            })}
            id={`combobox-list-:${uuid}:`}
            role="listbox"
          >
            {filteredOptions.map((option, i) => {
              const isSelected = option.value === value;
              const isFocused = focusedOptionIdx === i;
              return (
                <li
                  key={i}
                  id={`combobox-option-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  data-highlighted={isFocused}
                  className={cn("jnpr-searchableSelect-singleOption", {
                    selected: isSelected,
                    focused: isFocused,
                  })}
                  onClick={handleSelect(option)}
                >
                  <span className="jnpr-searchableSelect-optionText">
                    {option.label}
                  </span>
                  {isSelected && <Check width={16} />}
                </li>
              );
            })}
            {filteredOptions.length === 0 && (
              <p className="jnpr-searchableSelect-noResults">No Results</p>
            )}
          </ul>,
          document.body,
        )}
    </Box>
  );
}

export function useSearchableSelect(
  options: Option[],
  value: unknown,
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: unknown) => void,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectedOptionIdx = useMemo(
    () => (options || []).findIndex((o) => o.value === value),
    [options, value],
  );
  const selectedOption: Option | undefined = options?.[selectedOptionIdx];

  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [focusedOptionIdx, setFocusedOptionIdx] = useState<number | null>(null);

  function isMatchingSearchValue(o: Option, search?: string | null): boolean {
    if (!search) return true;

    // All space separated search terms need to match the label somewhere
    const searchTerms = search.toLowerCase().split(" ");
    const label = o.label.toLowerCase();

    let isMatching = true;
    for (const term of searchTerms) {
      if (!label.includes(term)) {
        isMatching = false;
        break;
      }
    }
    return isMatching;
  }

  const filteredOptions = useMemo(
    () => (options || []).filter((o) => isMatchingSearchValue(o, searchValue)),
    [options, searchValue],
  );

  const handleSelect = (option: Option) => () => {
    onChange?.(option.value);
    setSearchValue(null);
    setIsFocused(false);
  };

  function handleClear() {
    onChange?.(undefined);
    setSearchValue("");
    handleFocus();
  }

  function handleInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(ev.target.value);
  }

  function handleFocus() {
    inputRef.current?.select();
    setIsFocused(true);
    setFocusedOptionIdx(null);
  }

  function handleBlur() {
    setIsFocused(false);
    setSearchValue(null);
  }

  function handleKeyDown(ev: React.KeyboardEvent) {
    const isNoOptionFocused = focusedOptionIdx === null;

    if (ev.key === "ArrowDown") {
      const isLastOptionFocused =
        focusedOptionIdx === filteredOptions.length - 1;
      if (isNoOptionFocused || isLastOptionFocused) {
        setFocusedOptionIdx(0);
      } else {
        setFocusedOptionIdx(focusedOptionIdx + 1);
      }
    } else if (ev.key === "ArrowUp") {
      const isFirstOptionFocused = focusedOptionIdx === 0;
      if (isNoOptionFocused) return;
      if (isFirstOptionFocused) {
        setFocusedOptionIdx(filteredOptions.length - 1);
      } else {
        setFocusedOptionIdx(focusedOptionIdx - 1);
      }
    } else if (ev.key === "Enter") {
      const option = filteredOptions[focusedOptionIdx || 0];
      if (!!option) handleSelect(option)();
      handleFocus();
    } else if (ev.key === "Escape") {
      handleFocus();
      // Special case where we want to hide the suggestions
      setIsFocused(false);
    }
  }

  return {
    inputRef,
    isFocused,
    filteredOptions,
    selectedOption,
    selectedOptionIdx,
    focusedOptionIdx,
    searchValue,
    handleInputChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleSelect,
    handleClear,
  };
}
