document.addEventListener('DOMContentLoaded', () => {
  const contacts = [];
  const contactList = document.getElementById('contact-list');
  const searchInput = document.getElementById('search');
  const modal = document.getElementById('modal');
  const addContactBtn = document.getElementById('add-contact-btn');
  const closeModalBtn = document.getElementById('close-modal');
  const addContactForm = document.getElementById('add-contact-form');
  const phoneInput = document.getElementById('phone');

  addContactBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

  phoneInput.addEventListener('input', () => {
    let value = phoneInput.value.replace(/\D/g, '');
    if (value.startsWith('7')) value = value.slice(1);
    value = `7${value}`;
    const formatted = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
    phoneInput.value = formatted.trimEnd();
  });

  addContactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = phoneInput.value.trim();
    const isFavorite = document.getElementById('favorite').checked;

    if (!name || !phone.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)) {
      alert('Введите корректные данные! Имя не должно быть пустым, а телефон должен быть в формате +7 (999) 999-99-99');
      return;
    }

    const newContact = {
      id: Date.now(),
      name,
      phone,
      isFavorite,
    };

    contacts.push(newContact);
    renderContacts();
    modal.classList.add('hidden');
    addContactForm.reset();
  });

  const renderContacts = () => {
    contactList.innerHTML = '';
    const sortedContacts = [...contacts]
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => b.isFavorite - a.isFavorite);

    sortedContacts.forEach(contact => {
      const li = document.createElement('li');
      li.className = 'contact-item';
      li.innerHTML = `
        <span>${contact.name} (${contact.phone})</span>
        <div>
          <button class="favorite-btn">${contact.isFavorite ? '❤️' : '♡'}</button>
          <button class="delete-btn">Удалить</button>
        </div>
      `;

      li.querySelector('.delete-btn').addEventListener('click', () => {
        const index = contacts.findIndex(c => c.id === contact.id);
        contacts.splice(index, 1);
        renderContacts(); 
      });

      li.querySelector('.favorite-btn').addEventListener('click', () => {
        contact.isFavorite = !contact.isFavorite;
        renderContacts();
      });

      contactList.appendChild(li);
    });
  };

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(query)
    );
    contactList.innerHTML = ''; 
    filteredContacts.forEach(contact => {
      const li = document.createElement('li');
      li.className = 'contact-item';
      li.innerHTML = `
        <span>${contact.name} (${contact.phone})</span>
        <div>
          <button class="favorite-btn">${contact.isFavorite ? '❤️' : '♡'}</button>
          <button class="delete-btn">Удалить</button>
        </div>
      `;

      li.querySelector('.delete-btn').addEventListener('click', () => {
        const index = contacts.findIndex(c => c.id === contact.id);
        contacts.splice(index, 1);
        renderContacts();
      });

      li.querySelector('.favorite-btn').addEventListener('click', () => {
        contact.isFavorite = !contact.isFavorite;
        renderContacts();
      });

      contactList.appendChild(li);
    });
  });
});
