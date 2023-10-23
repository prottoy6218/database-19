import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const products = await prisma.product.findMany(); 
    const productsData = products.map((product) => ({
      id: Number(product.id),
      userId: Number(product.userId),
      firstName: product.firstName,
      metaTitle: product.metaTitle,
      slug: product.slug,
      summary: product.summary,
      price: product.price,
      discount: product.discount,
      publishedAt: product.publishedAt,
      startsAt: product.startsAt,
      endsAt: product.endsAt,
      createAt: product.createAt,
      updateAt: product.updateAt
    }));

    return NextResponse.json({ data: productsData });
  } catch (error) { 
    await prisma.$disconnect();
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch products",
      error: error.message,
      statusCode: 500,
    });
  }
}

export async function POST(req, res) {
  const prisma = new PrismaClient();

  try {
    const reqBody = await req.json();
    await prisma.product.create({
      data: {
        userId: Number(reqBody.userId),
        firstName: reqBody.firstName,
        metaTitle: reqBody.metaTitle,
        slug: reqBody.slug,
        summary: reqBody.summary,
        price: reqBody.price,
        discount: reqBody.discount,
        publishedAt: new Date(),
        startsAt: new Date(),
        endsAt: new Date(), 
        createAt: new Date()
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully Product Created",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to create a new product", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req, res) {
  const prisma = new PrismaClient();

  try {
    const reqBody = await req.json();
    await prisma.product.update({
      where:{email: reqBody.email},
      data: {
        userId: Number(reqBody.userId),
        firstName: reqBody.firstName,
        metaTitle: reqBody.metaTitle,
        slug: reqBody.slug,
        summary: reqBody.summary,
        price: reqBody.price,
        discount: reqBody.discount,
        publishedAt: new Date(),
        startsAt: new Date(),
        endsAt: new Date(),
        updateAt: new Date()
      }
    });
    return NextResponse.json({
      status: "Success", 
      message: "Successfully Product Updated",
      statusCode: 200
    });
  } catch (error) { 
    return NextResponse.json({
      status: "Error",
      message: "Failed to update a new product", 
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
    await prisma.product.delete({
      where:{email: reqBody.email}
    });
    return NextResponse.json({status: "Success", message: "Successfully Product Deleted",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to delete a new product", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}