document.addEventListener('DOMContentLoaded', () => {

    // -- Fetch book data
    const bookTable = document.querySelector("#bookTable tbody")
    const fetchBook = async () => {
        try {
            const res = await fetch(`http://localhost:8000/books`);
            const books = await res.json(); 
            bookTable.innerHTML ='';
            books.forEach(book => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                     <td>${book.author}</td>
                    <td>${book.published_date}</td>
                    <td>
                        <botton class="delete" onClick="deleteBook(${book.id})">Delete</button>
                    </td>            
                </tr>
                `;
                    bookTable.appendChild(tr);
            });
            console.log(books); 
        } catch (error) {
            console.error("Error fetching book data:", error); 
        }
    } 

    // -- แปลงวันที่ (Convert date)
    window.formatDate = (dateString) => {
        const date = new Date(dateString); 
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const day = String(date.getUTCDate()).padStart(2, '0'); 
        const year = date.getUTCFullYear(); // ปี

        return `${year}-${month}-${day}`; 
    }

    // -- ปิดหน้าต่าง (Close modal)
    window.closeModal = () => {
        const editWindow = document.getElementById('editWindow'); 
        if (editWindow) {
            editWindow.style.display = 'none'; 
        }
    }

    fetchBook();
});
