using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankApi.Migrations
{
    /// <inheritdoc />
    public partial class PasswordColumnFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Employees",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "PasswordHashed",
                table: "Customers",
                newName: "Password");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Employees",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Customers",
                newName: "PasswordHashed");
        }
    }
}
