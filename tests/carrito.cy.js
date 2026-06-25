describe("Carrito de compras", () => {

  it("flujo básico de compra", () => {

    // abrir la app
    cy.visit("/");

    // verificar productos
    cy.get(".card")
      .should("have.length.greaterThan", 0);

    // agregar producto al carrito
    cy.contains("Agregar").first().click();

    // verificar carrito
    cy.get("#carrito-items")
      .should("exist");

    cy.get(".item")
      .should("have.length.greaterThan", 0);

    // verificar total
    cy.get("#total")
      .should("not.contain", "$0");

    // eliminar producto
    cy.get(".item button").first().click();

  });

});