import { FormData } from "../components/form/BookFlightForm";

export const validateFormData = (section: HTMLElement | null) => {
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

async function postFormData(formData: FormData) : Promise<void> {

    await fetch('https://interview.fio.de/core-frontend/api/bookings/create?authToken=r1pRdmNkyhqz6TvG2krEBeyX1ilv8P', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(formData)
    });
}

export { postFormData };