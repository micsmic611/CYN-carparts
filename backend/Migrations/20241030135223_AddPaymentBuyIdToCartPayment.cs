using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddPaymentBuyIdToCartPayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartPayments_Products_Productid",
                table: "CartPayments");

            migrationBuilder.RenameColumn(
                name: "Productid",
                table: "CartPayments",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_CartPayments_Productid",
                table: "CartPayments",
                newName: "IX_CartPayments_ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartPayments_Products_ProductId",
                table: "CartPayments",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "product_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartPayments_Products_ProductId",
                table: "CartPayments");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "CartPayments",
                newName: "Productid");

            migrationBuilder.RenameIndex(
                name: "IX_CartPayments_ProductId",
                table: "CartPayments",
                newName: "IX_CartPayments_Productid");

            migrationBuilder.AddForeignKey(
                name: "FK_CartPayments_Products_Productid",
                table: "CartPayments",
                column: "Productid",
                principalTable: "Products",
                principalColumn: "product_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
