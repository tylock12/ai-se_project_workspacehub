export interface BookingFormState {
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
}

export const getBookingErrors = (
  formState: BookingFormState,
): Partial<Record<keyof BookingFormState, string>> => {
  const errors: Partial<Record<keyof BookingFormState, string>> = {};

  if (formState.title.trim().length < 2) {
    errors.title = "Title must be at least 2 characters";
  }

  if (!formState.startsAt) {
    errors.startsAt = "Start time is required";
  } else if (Number.isNaN(new Date(formState.startsAt).getTime())) {
    errors.startsAt = "Start time must be a valid date";
  }

  if (!formState.endsAt) {
    errors.endsAt = "End time is required";
  } else if (Number.isNaN(new Date(formState.endsAt).getTime())) {
    errors.endsAt = "End time must be a valid date";
  } else {
    const startsAt = new Date(formState.startsAt);
    const endsAt = new Date(formState.endsAt);

    if (
      !Number.isNaN(startsAt.getTime()) &&
      endsAt.getTime() <= startsAt.getTime()
    ) {
      errors.endsAt = "End time must be after start time";
    }
  }

  return errors;
};
