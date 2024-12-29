import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimestampToDateString(timestamp: number): string {
  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Define options for formatting the date
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };

  // Format the date to a string
  const formattedDate = date.toLocaleDateString('en-GB', options);

  return formattedDate;
}