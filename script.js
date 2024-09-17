$(document).ready(function() { // Wait for HTML to load

  // Fetch JSON data and initialize the DataTable
  fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
      var table = $('#mapartTable').DataTable({
        data: jsonData,
        responsive: true,
        columns: [ // Formatting each json element from json data to be a new row/mapart entry
          { data: 'name' },
          { data: 'mapart', render: function(data, type, row) {
              return `<img src="${data}" alt="${row.name}" width="120" onclick="openModal(this)">`;
            }
          },
          { data: 'artists' },
          { data: 'notes' }
        ],
        columnDefs: [
            { orderable: false, targets: [1, 3] } // Which columns/categories you can order alphabetically
        ],
        language: { // Really just replacing default string values for most messages; e.g replace "record" or something with "mapart" 
          lengthMenu: "Show _MENU_ maparts per page",
          zeroRecords: "No matching maparts found",
          info: "Showing _START_ to _END_ of _TOTAL_ maparts",
          infoFiltered: "(filtered from _MAX_ total maparts)",
          search:         "Search all categories! ",
          searchPlaceholder: 'Search'
        },
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], // Options for amounta rows (maparts) to show
        iDisplayLength: 10, // Default numbers of rows (maparts) shown
        initComplete: function () {
          let searchableColumns = [0, 2, 3]; // Name, Artists & Notes

          this.api()
              .columns(searchableColumns)
              .every(function () {
                  var column = this;
                  var title = column.footer().textContent;

                  // Create transparent search element and add event listener for each searchableColumns
                  $('<input type="text" placeholder="Search ' + title + '" />')
                      .css({
                        'background-color': 'transparent',
                        'border': '1px solid white',
                        'color': 'white',
                        'padding': '5px',
                        'border-radius': '4px'
                      })
                      .appendTo($(column.footer()).empty())
                      .on('keyup change clear', function () {
                          if (column.search() !== this.value) {
                              column.search(this.value).draw();
                          }
                      });
              });
        },
      });

      // This (somehow) refreshes the DatTable columns to properly return which ones are hidden/visible.
      // This needed as without it when site initally loaded/refreshed hidden columns will still be stated as visible by responsive-resize n other api calls.
      table.column(3).visible(false, false);
      table.column(3).visible(true, false);

      // Add the 'responsive-resize' event for when a column is hidden/revealed (i forgor if this actually what triggers it)
      table.on('responsive-resize', function(e, datatable, columns) {

        // Check if any columns are hidden (false) & do some basic adjustment to name header
        if (columns.includes(false)) {
          $('#nameHeader').text('Name (& more)');
        } else {
          $('#nameHeader').text('Name');
        }

      })
    })
    .catch(error => console.log('Error fetching JSON:', error));
});


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