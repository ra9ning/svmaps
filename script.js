function sortTableByDate() {
  const table = document.getElementById("imageTable");
  const rows = Array.from(table.rows).slice(1); // Exclude header row
  rows.sort((rowA, rowB) => {
    const dateA = new Date(rowA.cells[2].getAttribute("data-date"));
    const dateB = new Date(rowB.cells[2].getAttribute("data-date"));
    return dateA - dateB; // For ascending order
  });
  rows.forEach(row => table.appendChild(row)); // Reattach sorted rows
}

function filterByCreator() {
  const input = document.getElementById("creatorFilter").value.toLowerCase();
  const rows = document.getElementById("imageTable").getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) { // Skip header row
    const creators = rows[i].cells[2].getAttribute("data-creators").toLowerCase();
    if (creators.includes(input)) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

function openModal(imgElement) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = imgElement.src;
  captionText.innerHTML = imgElement.alt; // Display the image's alt text as the caption
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
}
