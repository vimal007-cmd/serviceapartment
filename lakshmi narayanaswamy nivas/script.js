document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const tenantName = document.getElementById('tenantName').value;
    const tenantPhone = document.getElementById('tenantPhone').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const roomType = document.getElementById('roomType').value;
    const roomNo = document.getElementById('roomNo').value;
    const committedAmount = parseFloat(document.getElementById('committedAmount').value);
    const paymentReceived = parseFloat(document.getElementById('paymentReceived').value);
    
    // Automatically calculate balance amount
    const balanceAmount = committedAmount - paymentReceived;
    
    // Automatically determine payment done status
    const paymentDone = balanceAmount === 0 ? "Yes" : "No";

    // Add balance amount and payment done value to the form (for display purposes)
    document.getElementById('balanceAmount').value = balanceAmount;

    const editingRowIndex = document.getElementById('editingRowIndex').value;

    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    if (editingRowIndex) {
        // Update existing booking
        bookings[editingRowIndex] = {
            tenantName,
            tenantPhone,
            checkIn,
            checkOut,
            roomType,
            roomNo,
            committedAmount,
            paymentReceived,
            balanceAmount,
            paymentDone
        };
        document.getElementById('editingRowIndex').value = ''; // Clear edit mode
    } else {
        // Add new booking
        bookings.push({
            tenantName,
            tenantPhone,
            checkIn,
            checkOut,
            roomType,
            roomNo,
            committedAmount,
            paymentReceived,
            balanceAmount,
            paymentDone
        });
    }

    // Store updated bookings array in localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Reset the form and reload table
    document.getElementById('bookingForm').reset();
    document.getElementById('balanceAmount').value = '';
    loadBookings();
});

// Function to load bookings from localStorage and display in table
function loadBookings() {
    const tableBody = document.getElementById('bookingDetails');
    tableBody.innerHTML = ''; // Clear the table

    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    bookings.forEach((booking, index) => {
        const newRow = tableBody.insertRow();

        newRow.insertCell(0).textContent = booking.tenantName;
        newRow.insertCell(1).textContent = booking.tenantPhone;
        newRow.insertCell(2).textContent = booking.checkIn;
        newRow.insertCell(3).textContent = booking.checkOut;
        newRow.insertCell(4).textContent = booking.roomType;
        newRow.insertCell(5).textContent = booking.roomNo;
        newRow.insertCell(6).textContent = booking.committedAmount;
        newRow.insertCell(7).textContent = booking.paymentReceived;
        newRow.insertCell(8).textContent = booking.balanceAmount;
        newRow.insertCell(9).textContent = booking.paymentDone;

        const actionCell = newRow.insertCell(10);
        actionCell.innerHTML = `
            <button class="editBtn" onclick="editBooking(${index})">Edit</button>
            <button class="deleteBtn" onclick="deleteBooking(${index})">Delete</button>
        `;
    });
}

// Function to edit a booking
function editBooking(index) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const booking = bookings[index];

    // Populate form with booking data
    document.getElementById('tenantName').value = booking.tenantName;
    document.getElementById('tenantPhone').value = booking.tenantPhone;
    document.getElementById('checkIn').value = booking.checkIn;
    document.getElementById('checkOut').value = booking.checkOut;
    document.getElementById('roomType').value = booking.roomType;
    document.getElementById('roomNo').value = booking.roomNo;
    document.getElementById('committedAmount').value = booking.committedAmount;
    document.getElementById('paymentReceived').value = booking.paymentReceived;
    document.getElementById('balanceAmount').value = booking.balanceAmount;

    // Set editing index
    document.getElementById('editingRowIndex').value = index;
}

// Function to delete a booking
function deleteBooking(index) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.splice(index, 1); // Remove booking by index
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadBookings(); // Refresh table
}

// Load bookings on page load
window.onload = function() {
    loadBookings();
};
