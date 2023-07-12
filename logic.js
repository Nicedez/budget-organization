const deleteEnvelope = (id) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/envelopes/${id}`, false);
    xhttp.send();

    // Reloading the page
    location.reload();
}

const loadEnvelopes = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/", false);
    xhttp.send();

    const envelopes = JSON.parse(xhttp.responseText);

    for (let envelope of envelopes) {
        const x = `
           
          <tr>
            <td >${envelope.envelopes}</td>
            <td >${envelope.budget}</td>
            <td>
              <button class="save-btn">Save</button>
              <button class="edit-btn">Edit</button>
              <button class="delete-btn" onClick="deleteEnvelope(${envelope.id})">Delete</button>
            </td>
          </tr>
        `

        document.getElementById('envelopesTable').innerHTML = document.getElementById('envelopesTable').innerHTML + x;
    }
}

loadEnvelopes();