-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "User" (
    "Id" int   NOT NULL,
    "Name" string   NOT NULL,
    "Password" string   NOT NULL,
    "Email" string   NULL,
    CONSTRAINT "pk_User" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "Board" (
    "Id" int   NOT NULL,
    "Name" string   NOT NULL,
    CONSTRAINT "pk_Board" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "BoardMemeber" (
    "BoardId" int   NOT NULL,
    "UserId" int   NOT NULL,
    "IsManager" bool   NOT NULL
);

CREATE TABLE "BoardActivity" (
    "BoardId" int   NOT NULL,
    "UserId" int   NOT NULL,
    "action" String   NOT NULL
);

CREATE TABLE "List" (
    "Id" int   NOT NULL,
    "Name" string   NOT NULL,
    "BoardId" int   NOT NULL,
    CONSTRAINT "pk_List" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "ListMemeber" (
    "ListId" int   NOT NULL,
    "UserId" int   NOT NULL
);

CREATE TABLE "ListActivity" (
    "ListId" int   NOT NULL,
    "UserId" int   NOT NULL,
    "action" String   NOT NULL
);

CREATE TABLE "Card" (
    "Id" int   NOT NULL,
    "Name" string   NOT NULL,
    "DueDate" int   NOT NULL,
    "IsDone" bool   NOT NULL,
    "ListId" int   NOT NULL,
    CONSTRAINT "pk_Card" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "CardMemeber" (
    "CardId" int   NOT NULL,
    "UserId" int   NOT NULL
);

CREATE TABLE "CardActivity" (
    "CardId" int   NOT NULL,
    "UserId" int   NOT NULL,
    "action" String   NOT NULL
);

ALTER TABLE "BoardMemeber" ADD CONSTRAINT "fk_BoardMemeber_BoardId" FOREIGN KEY("BoardId")
REFERENCES "Board" ("Id");

ALTER TABLE "BoardMemeber" ADD CONSTRAINT "fk_BoardMemeber_UserId" FOREIGN KEY("UserId")
REFERENCES "User" ("Id");

ALTER TABLE "BoardActivity" ADD CONSTRAINT "fk_BoardActivity_BoardId" FOREIGN KEY("BoardId")
REFERENCES "Board" ("Id");

ALTER TABLE "BoardActivity" ADD CONSTRAINT "fk_BoardActivity_UserId" FOREIGN KEY("UserId")
REFERENCES "User" ("Id");

ALTER TABLE "List" ADD CONSTRAINT "fk_List_BoardId" FOREIGN KEY("BoardId")
REFERENCES "Board" ("Id");

ALTER TABLE "ListMemeber" ADD CONSTRAINT "fk_ListMemeber_ListId" FOREIGN KEY("ListId")
REFERENCES "List" ("Id");

ALTER TABLE "ListMemeber" ADD CONSTRAINT "fk_ListMemeber_UserId" FOREIGN KEY("UserId")
REFERENCES "User" ("Id");

ALTER TABLE "ListActivity" ADD CONSTRAINT "fk_ListActivity_ListId" FOREIGN KEY("ListId")
REFERENCES "List" ("Id");

ALTER TABLE "ListActivity" ADD CONSTRAINT "fk_ListActivity_UserId" FOREIGN KEY("UserId")
REFERENCES "User" ("Id");

ALTER TABLE "Card" ADD CONSTRAINT "fk_Card_ListId" FOREIGN KEY("ListId")
REFERENCES "List" ("Id");

ALTER TABLE "CardMemeber" ADD CONSTRAINT "fk_CardMemeber_CardId" FOREIGN KEY("CardId")
REFERENCES "Card" ("Id");

ALTER TABLE "CardMemeber" ADD CONSTRAINT "fk_CardMemeber_UserId" FOREIGN KEY("UserId")
REFERENCES "User" ("Id");

ALTER TABLE "CardActivity" ADD CONSTRAINT "fk_CardActivity_CardId" FOREIGN KEY("CardId")
REFERENCES "Card" ("Id");

ALTER TABLE "CardActivity" ADD CONSTRAINT "fk_CardActivity_UserId" FOREIGN KEY("UserId")
REFERENCES "User" ("Id");

CREATE INDEX "idx_User_Name"
ON "User" ("Name");

