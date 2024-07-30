import { formatDate } from "@angular/common";

export function converterDate(dateString: string, format: string, locale: string): string {
    console.log('input date', dateString);
    console.log('format', format);
    console.log('locale', locale);
    // Create a Date object from the string
    // const date = new Date(dateString);
    // console.log('converter', date);

    // Use the `toISOString` method to format the date
    const formattedDate = formatDate((dateString).toString(), format, locale);

    console.log('formattedDate', formattedDate);

    // Extract the year, month, and day components
    // const year = formattedDate.substring(0, 4);
    // const month = formattedDate.substring(5, 7);
    // const day = formattedDate.substring(8, 10);

    // Replace hyphens with slashes
    return formattedDate;
}
