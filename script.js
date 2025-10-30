// Ajouter un produit
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('product-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const reader = new FileReader();
      const file = document.getElementById('image').files[0];

      reader.onloadend = function () {
        const produit = {
          name: document.getElementById('name').value,
          price: document.getElementById('price').value,
          description: document.getElementById('description').value,
          image: reader.result,
          facebook: document.getElementById('facebook').value,
          phone: document.getElementById('phone').value
        };

        const produits = JSON.parse(localStorage.getItem('produits')) || [];
        produits.push(produit);
        localStorage.setItem('produits', JSON.stringify(produits));

        alert("Produit ajouté !");
        window.location.href = "index.html";
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }

  // Afficher les produits sur la page d’accueil
  const productList = document.getElementById('product-list');
  if (productList) {
    const produits = JSON.parse(localStorage.getItem('produits')) || [];

    produits.forEach(p => {
      const div = document.createElement('div');
      div.className = "product";
      div.innerHTML = \`
        <img src="\${p.image}" alt="\${p.name}">
        <h2>\${p.name}</h2>
        <p><strong>Prix :</strong> \${p.price} Ar</p>
        <p>\${p.description}</p>
        <a href="\${p.facebook}" target="_blank" class="btn">Contacter sur Facebook</a><br><br>
        <a href="tel:\${p.phone}" class="btn">📞 Appeler le vendeur</a>
      \`;
      productList.appendChild(div);
    });
  }
});