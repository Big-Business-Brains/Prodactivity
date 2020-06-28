using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace prodactivity.Migrations
{
    public partial class AddRecurrenceInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RecurrenceRule",
                table: "Routines",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Routines",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RecurrenceRule",
                table: "Routines");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Routines");
        }
    }
}
