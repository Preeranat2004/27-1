document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = `http://localhost:8000;`
    const booktable = document.querySelector('#bookTable tbody');

    const fetchBooks = async() => {
        try{
            const res = await fetch(`${BASE_URL}/books`);
            const books = await res.json();

            console.log(books);

            books.foeEach(book => {
                //console.log(book.id, book.title, book.author, book.published_date);
                const tr = document.createElement('tr');
                tr.innerHTML =`         
                <tr>
                    <td>${book,id}</td>
                    <td>${book,title}</td>
                    <td>${book,author}</td>
                    <td>${book,published_date}</td>
                    <td>
                        <botton class="edit">Edit</button>
                        <botton class="delete">onClick="deleteBook(${book.id})">Delete</button>
                    </td>
                </tr>
                `; //ale+96
                booktable.appendChild(tr);
            });

        } catch (error) {
            console.log('Error from fetch', error);
        }
    }

    window.deleteBook = async(id) => {
        if (confirm('DELETE?')) { 
        try{
            //console.log(id)
            const res = await fetch(`${BASE_URL}/book/${id}`,{
                method: 'DELETE'
            });
            if (res.ok){
                fetchBooks();
            }
        } catch (error) {
        console.log('Error from fetch', error); 
      }
    }
}




    
    // -- แปลงวันที่
    window.formatDate = (dateString) => {
        const date = new Date(dateString); // แปลง string เป็น Date object
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // เดือน (0-11) + 1
        const day = String(date.getUTCDate()).padStart(2, '0'); // วัน
        const year = date.getUTCFullYear(); // ปี

        return `${year}-${month}-${day}`; // รูปแบบ mm/dd/yyyy
    }

    // -- ปิดหน้าต่าง
    window.closeModal = () => {
        editWindow.style.display = 'none';
    }

    fetchBooks();
});