document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".edit-button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.dataset.id;
      const productForm = document.querySelector("#product-form");
      try {
        const res = await fetch("/products/get-product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productId }),
        });
        const data = await res.json();
        console.log(data);

        document
          .querySelector(".add-product-container")
          .classList.add("active");
        document
          .querySelector(".product-main-container")
          .classList.add("active");

        productForm.action = `/products/edit-product/${data.product.id}`;
        document.querySelector(".add-product-container .heading").innerText =
          "Edit Product";

        document.querySelector(
          ".add-product-container .form #product-id",
        ).value = data.product.id;
        document.querySelector(
          ".add-product-container .form #product-name",
        ).value = data.product.name;
        document.querySelector(
          ".add-product-container .form #product-price",
        ).value = parseFloat(data.product.price);
        document.querySelector(
          ".add-product-container .form #product-quantity",
        ).value = parseInt(data.product.quantity, 10);
        document.querySelector("#submit-btn").innerText = "Update Product";
      } catch (err) {
        console.error(err);
      }
    });
  });

  document.querySelectorAll(".product-table .delete-button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.dataset.id;
      console.log(productId, "prooooo");
      try {
        const confirmDelete = confirm("Are you sure?");
        if (!confirmDelete) return;

        const res = await fetch(`/products/delete-product/${productId}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (data.success) {
          window.location.reload();
          document.querySelector(`tr[data-id="${productId}"]`).remove();
        }
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    });
  });
});

function resetProductForm() {
  const container = document.querySelector(".add-product-container");
  const mainContainer = document.querySelector(".product-main-container");
  const form = container.querySelector(".form");
  form.action = `/products/add-product`;

  container.classList.remove("active");
  mainContainer.classList.remove("active");

  container.querySelector(".heading").innerText = "Add Product";
  document.querySelector("#submit-btn").innerText = "Confirm";
  form.reset();

  const productIdInput = form.querySelector("#product-id");
  if (productIdInput) {
    productIdInput.value = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-product-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelector(".add-product-container")
        .classList.toggle("active");
      document
        .querySelector(".product-main-container")
        .classList.toggle("active");
    });
  });

  document.querySelectorAll(".add-product-cancel-button").forEach((btn) => {
    btn.addEventListener("click", resetProductForm);
  });
});

function showToast(type, title, message) {
  const box = document.getElementById("toast-box");

  const toast = document.createElement("div");
  toast.className = `notification ${type}`;
  toast.innerHTML = `
    <div>✔</div>
    <div class="title">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
  `;

  box.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
