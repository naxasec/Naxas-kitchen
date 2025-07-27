//array of food
document.addEventListener("DOMContentLoaded", () => {
    const meals = [
        { name: "Abacha", price: 4000 },
        { name: "Achicha", price: 6000 },
        { name: "Jollof Rice", price: 4000 },
        { name: "Akpu and Egusi soup", price: 4000 },
        { name: "Rice and ofe-akwu", price: 5000 },
        { name: "Naxa's special", price: 10000 },
    ];

    //plate DOM manipulation
    const cart = [];
    const cartList = document.getElementById("cart-items");
    const totalCost = document.getElementById("total-cost");
    const submitBtn = document.getElementById("submit-order");
    const printBtn = document.getElementById("print-order");
    const spinner = document.getElementById("loading-spinner");

    //price total
    const updateTotal = () => {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalCost.textContent = total;
    };

    //display DOM
    const renderCart = () => {
        cartList.innerHTML = "";
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - ₦${item.price}`;
            cartList.appendChild(li);
        });
        updateTotal();
    };

    //Add to plate button DOM
    document.querySelectorAll(".card").forEach((card, index) => {
        const button = card.querySelector(".addtoplate");
        button.addEventListener("click", () => {
            cart.push(meals[index]);
            renderCart();
        });
    });

    //submit order
    submitBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Please add at least one meal to your plate.");
            return;
        }

        //submit spinner animation
        spinner.style.display = "block";
        submitBtn.disabled = true;

        setTimeout(() => {
            spinner.style.display = "none";
            submitBtn.disabled = false;
            alert("Order submitted successfully!");
            cart.length = 0;
            renderCart();
        }, 2000);
    });

    //print button
    printBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("No meals to print.");
            return;
        }

        //print button action window
        const printWindow = window.open("", "", "width=600,height=600");
        const mealList = cart.map(item => `<li>${item.name} - ₦${item.price}</li>`).join("");
        const total = cart.reduce((sum, item) => sum + item.price, 0);

        printWindow.document.write(`
            <html>
            <head><title>Print Order</title></head>
            <body>
                <h2>Your Order from Naxa's Kitchen</h2>
                <ul>${mealList}</ul>
                <p><strong>Total: ₦${total}</strong></p>
                <script>window.onload = () => window.print();</script>
            </body>
            </html>
        `);
        printWindow.document.close();
    });
});
