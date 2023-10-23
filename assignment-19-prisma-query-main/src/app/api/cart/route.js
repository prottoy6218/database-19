import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const carts = await prisma.cart.findMany(); 
    const cartsData = carts.map((cart) => ({
      id: Number(cart.id),
      userId: Number(cart.userId),
      title: cart.title,
      sessionId: cart.sessionId,
      token: cart.token,
      status: cart.status,
      firstName: cart.firstName,
      middleName: cart.middleName,
      lastName: cart.lastName,
      mobile: cart.mobile,
      email: cart.email,
      city: cart.city,
      country: cart.country,
      createAt: cart.createAt,
      updateAt: cart.updateAt
    }));

    return NextResponse.json({ data: cartsData });
  } catch (error) { 
    await prisma.$disconnect();
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch carts",
      error: error.message,
      statusCode: 500,
    });
  }
}

export async function POST(req, res) {
  const prisma = new PrismaClient();

  try {
    const reqBody = await req.json();
    await prisma.cart.create({
      data: {
        userId: Number(reqBody.userId),
        title: reqBody.title,
        sessionId: reqBody.sessionId,
        token: reqBody.token,
        status: reqBody.status,
        firstName: reqBody.firstName,
        middleName: reqBody.middleName,
        lastName: reqBody.lastName,
        mobile: reqBody.mobile,
        email: reqBody.email,
        city: reqBody.city,
        country: reqBody.country,
        createAt: new Date()
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully Cart Created",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to create a new cart", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req, res) {
  const prisma = new PrismaClient();

  try {
    const reqBody = await req.json();
    await prisma.cart.update({
      where:{email: reqBody.email},
      data: {
        userId: Number(reqBody.userId),
        title: reqBody.title,
        sessionId: reqBody.sessionId,
        token: reqBody.token,
        status: reqBody.status,
        firstName: reqBody.firstName,
        middleName: reqBody.middleName,
        lastName: reqBody.lastName,
        mobile: reqBody.mobile,
        email: reqBody.email,
        city: reqBody.city,
        country: reqBody.country,
        updateAt: new Date()
      }
    });
    return NextResponse.json({
      status: "Success", 
      message: "Successfully Cart Updated",
      statusCode: 200
    });
  } catch (error) { 
    return NextResponse.json({
      status: "Error",
      message: "Failed to update a new cart", 
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
    await prisma.cart.delete({
      where:{email: reqBody.email}
    });
    return NextResponse.json({status: "Success", message: "Successfully Cart Deleted",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to delete a new cart", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}