import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const product_meta = await prisma.product_Meta.findMany();
    const productmetaData = product_meta.map((product_meta) => ({
      id: Number(product_meta.id),
      productId: Number(product_meta.productId),
      key: product_meta.key,
      content: product_meta.content,
      createAt: product_meta.createAt,
      updateAt: product_meta.updateAt
    }));

    return NextResponse.json({ data: productmetaData });
  } catch (error) {
    console.error("Error fetching product meta:", error);
    await prisma.$disconnect();
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch product meta",
      error: error.message,
      statusCode: 500,
    });
  }
}

export async function POST(req, res) {
  const prisma = new PrismaClient();
  try {
    const reqBody = await req.json();
    await prisma.product_Meta.create({
      data: {
        productId: reqBody.productId,
        Key: reqBody.key,
        content: reqBody.content,
        createAt: new Date()
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully Product Meta Created",statusCode: 200});
  } catch (error) {
    return NextResponse.json({
      status: "Error",
      message: "Failed to create a new Product Meta",
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
    await prisma.product_Meta.update({
      where:{id:reqBody.id},
      data: {
        productId: reqBody.productId,
        Key: reqBody.key,
        content: reqBody.content,
        updateAt: new Date()
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully Product Meta Updated",statusCode: 200});
  } catch (error) {
    return NextResponse.json({
      status: "Error",
      message: "Failed to update a new Product Meta",
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
    await prisma.product_Meta.delete({
      where:{id:reqBody.id}
    });
    return NextResponse.json({status: "Success", message: "Successfully Product Meta Deleted",statusCode: 200});
  } catch (error) {
    return NextResponse.json({ status: "Error", message: "Failed to delete a new category", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}
