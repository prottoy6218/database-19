import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    //Aggregate Query
    const orderCount = await prisma.order.aggregate({ _count: { id: true } }); 
    return NextResponse.json({ data: orderCount });
    
    const result = await prisma.order.aggregate({
        _sum: {subTotal: true, itemDiscount: true, tax: true, total: true, discount: true, grandTotal: true},
        _avg: {subTotal: true, itemDiscount: true, tax: true, total: true, discount: true, grandTotal: true},
        _max: {subTotal: true, itemDiscount: true, tax: true, total: true, discount: true, grandTotal: true},
    });
    return NextResponse.json({ data: result });
    
    const orders = await prisma.order.groupBy({
        by: ['userId'],
        _sum: {subTotal: true, itemDiscount: true, tax: true, total: true, discount: true, grandTotal: true},
    });
    return NextResponse.json({ data: orders });

    //Find Many
    /*const orders = await prisma.order.findMany(); 
    const orderData = orders.map((order) => ({
      id: Number(order.id), 
      userId: Number(order.userId), 
      title: order.title,
      token: order.token,
      subTotal: order.subTotal,
      itemDiscount: order.itemDiscount,
      tax: order.tax,
      total: order.	total,
      discount: order.discount,
      grandTotal: order.grandTotal,
      firstName: order.firstName,
      middleName: order.middleName,
      lastName: order.lastName,
      mobile: order.mobile,
      email: order.email,
      city: order.city,
      country: order.country,
      createAt: order.createAt,
      updateAt: order.updateAt
    }));
    return NextResponse.json({ data: orderData });*/
  } catch (error) {
    console.error("Error fetching orders:", error);
    await prisma.$disconnect();
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch orders",
      error: error.message,
      statusCode: 500,
    });
  }
}

export async function POST(req, res) {
  const prisma = new PrismaClient();
  try {
    const reqBody = await req.json();
    await prisma.order.create({
      data: {
        userId: Number(reqBody.userId),
        title: reqBody.title,
        token: reqBody.token,
        subTotal: reqBody.subTotal,
        itemDiscount: reqBody.itemDiscount,
        tax: reqBody.tax,
        total: reqBody.	total,
        discount: reqBody.discount,
        grandTotal: reqBody.grandTotal,
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
    return NextResponse.json({status: "Success", message: "Successfully Order Created",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ 
      status: "Error", 
      message: "Failed to create a new Order", 
      statusCode: 500,
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req, res) {
  const prisma = new PrismaClient();

  try {
    const reqBody = await req.json();
    await prisma.order.update({
      where:{id:reqBody.id},
      data: {
        userId: Number(reqBody.userId),
        title: reqBody.title,
        token: reqBody.token,
        subTotal: reqBody.subTotal,
        itemDiscount: reqBody.itemDiscount,
        tax: reqBody.tax,
        total: reqBody.	total,
        discount: reqBody.discount,
        grandTotal: reqBody.grandTotal,
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
    return NextResponse.json({status: "Success", message: "Successfully Order Updated",statusCode: 200});
  } catch (error) {
    return NextResponse.json({
      status: "Error",
      message: "Failed to update a new Order",
      statusCode: 500,
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req, res) {
  const prisma = new PrismaClient();
  const reqBody = await req.json();
  try {
    await prisma.order.delete({
      where:{id:reqBody.id}
    });
    return NextResponse.json({status: "Success", message: "Successfully Order Deleted",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to delete a new category", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}


