import { useAddNewLocation } from "hooks/useAddNewLocation";
import { MapLocation, PlaceName } from "models";
import React from "react";

import Form from "./Form";

export function AddToTimeline({
  allLocations,
  allBadges,
}: {
  allLocations: MapLocation[];
  allBadges: string[];
}) {
  const [showForm, setShowForm] = React.useState<boolean>(false);
  const addNewLocation = useAddNewLocation();

  const toggleForm = () => setShowForm(!showForm);

  const onFinish = async (location: PlaceName) => {
    await addNewLocation(location);
    toggleForm();
  };

  return <Form {...{ allLocations, allBadges, onFinish }} />;
}

export default AddToTimeline;
