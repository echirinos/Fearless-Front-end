window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    const response = await fetch(url);

    if (response.ok){
        const data = await response.json();

        const selectTag = document.getElementById('conference');

        for (let conference of data.conferences) {
            const option = document.createElement('option');
            option.value = conference.href;
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }

        const divTag = document.getElementById('loading-conference-spinner');
        divTag.classList.add("d-none");
        selectTag.classList.remove("d-none");
    }

    const formTag = document.getElementById('create-attendee-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const attendeeUrl = `http://localhost:8001/api/attendees/`;
        const response = await fetch(attendeeUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newAttendee = await response.json();

            const formOkTag = document.getElementById("success-message");
            formOkTag.classList.remove("d-none");
            formTag.classList.add("d-none");
        }
    });
});
