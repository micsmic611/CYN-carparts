using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class CreateCartPaymentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "cart",
                columns: table => new
                {
                    cart_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(type: "int", nullable: true),
                    product_id = table.Column<int>(type: "int", nullable: true),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    total_price = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cart", x => x.cart_id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    category_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    category_name = table.Column<string>(name: "category_name ", type: "varchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.category_id);
                });

            migrationBuilder.CreateTable(
                name: "Location",
                columns: table => new
                {
                    location_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(name: "user_id ", type: "int", nullable: true),
                    address = table.Column<string>(name: "address ", type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.location_id);
                });

            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    buy_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(type: "int", nullable: true),
                    cart_id = table.Column<int>(type: "int", nullable: true),
                    total_price = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: false),
                    location_id = table.Column<int>(type: "int", nullable: true),
                    status = table.Column<string>(type: "varchar(20)", nullable: true),
                    shipping_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment", x => x.buy_id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    seller_id = table.Column<int>(type: "int", nullable: false),
                    product_name = table.Column<string>(name: "product_name ", type: "varchar(255)", nullable: true),
                    description = table.Column<string>(name: "description ", type: "varchar(255)", nullable: true),
                    price = table.Column<decimal>(name: "price ", type: "DECIMAL(10,2)", nullable: false),
                    stock = table.Column<int>(name: "stock ", type: "int", nullable: true),
                    category_id = table.Column<int>(name: "category_id ", type: "int", nullable: true),
                    created_at = table.Column<DateTime>(type: "DATETIME", nullable: true),
                    product_img = table.Column<string>(type: "varchar(250)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.product_id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    role_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rolename = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.role_id);
                });

            migrationBuilder.CreateTable(
                name: "Send",
                columns: table => new
                {
                    send_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    buy_id = table.Column<int>(type: "int", nullable: true),
                    send_status = table.Column<string>(type: "varchar(50)", nullable: true),
                    TrackNum = table.Column<string>(type: "varchar(100)", nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Send", x => x.send_id);
                });

            migrationBuilder.CreateTable(
                name: "Shipping",
                columns: table => new
                {
                    shipping_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    shipping_name = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shipping", x => x.shipping_id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(name: "username ", type: "varchar(255)", nullable: true),
                    password = table.Column<string>(name: "password ", type: "varchar(255)", nullable: true),
                    Firstname = table.Column<string>(type: "varchar(255)", nullable: true),
                    Lastname = table.Column<string>(type: "varchar(255)", nullable: true),
                    email = table.Column<string>(type: "varchar(255)", nullable: true),
                    phone_number = table.Column<string>(type: "varchar(20)", nullable: true),
                    Uaddress = table.Column<string>(type: "varchar(255)", nullable: true),
                    role_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "CartPayment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BuyId = table.Column<int>(type: "int", nullable: false),
                    cart_id = table.Column<int>(type: "int", nullable: false),
                    PaymentBuy_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartPayment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CartPayment_Payment_PaymentBuy_id",
                        column: x => x.PaymentBuy_id,
                        principalTable: "Payment",
                        principalColumn: "buy_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartPayment_PaymentBuy_id",
                table: "CartPayment",
                column: "PaymentBuy_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "cart");

            migrationBuilder.DropTable(
                name: "CartPayment");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Location");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Send");

            migrationBuilder.DropTable(
                name: "Shipping");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Payment");
        }
    }
}
