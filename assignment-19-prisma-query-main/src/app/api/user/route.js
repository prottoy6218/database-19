import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany(); 
    const usersData = users.map((user) => ({
      id: Number(user.id),
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email,
      password: user.password,
      admin: user.admin,
      registeredAt: user.registeredAt,
      lastLoginAt: user.lastLoginAt,
      createAt: user.createAt,
      updateAt: user.updateAt
    }));

    return NextResponse.json({ data: usersData });
  } catch (error) {
    console.error("Error fetching users:", error);
    await prisma.$disconnect();
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch users",
      error: error.message,
      statusCode: 500,
    });
  }
}

export async function POST(req, res) {
  const prisma = new PrismaClient();

  try {
    const reqBody = await req.json();
    await prisma.user.create({
      data: {
        firstName: reqBody.firstName,
        middleName: reqBody.middleName,
        lastName: reqBody.lastName,
        mobile: reqBody.mobile,
        email: reqBody.email,
        admin: reqBody.admin,
        password: reqBody.password,
        registeredAt: new Date(),
        lastLoginAt: new Date(),
        createAt: new Date()
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully User Created",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to create a new user", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req, res) {
  const prisma = new PrismaClient();

  try {
    const reqBody = await req.json();
    await prisma.user.update({
      where:{email: reqBody.email},
      data: {
        firstName: reqBody.firstName,
        middleName: reqBody.middleName,
        lastName: reqBody.lastName,
        mobile: reqBody.mobile,
        email: reqBody.email,
        admin: reqBody.admin,
        password: reqBody.password,
        registeredAt: new Date(),
        lastLoginAt: new Date(),
        updateAt: new Date()
      }
    });
    return NextResponse.json({
      status: "Success", 
      message: "Successfully User Updated",
      statusCode: 200
    });
  } catch (error) { 
    return NextResponse.json({
      status: "Error",
      message: "Failed to update a new user", 
      statusCode: 500,
      error: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req, res) {
  const prisma = new PrismaClient();
  const reqBody = await req.json();
  try {
    const deleteUser = await prisma.user.delete({
      where:{id: reqBody.id}
    });
    
    const deleteOrder = await prisma.order.delete({
      where:{userId: reqBody.id}
    });
    
    await prisma.$transaction([deleteUser, deleteOrder])
    
    return NextResponse.json({status: "Success", message: "Successfully User Deleted",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to delete a new user", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}