-- CreateTable
CREATE TABLE "User" (
    "idUser" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "friendId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_idUser_key" ON "User"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_friendId_key" ON "User"("friendId");

-- CreateIndex
CREATE INDEX "User_idUser_idx" ON "User"("idUser");

-- CreateIndex
CREATE INDEX "User_friendId_idx" ON "User"("friendId");
