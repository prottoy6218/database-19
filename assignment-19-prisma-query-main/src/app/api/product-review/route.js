import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const product_review = await prisma.product_Review.findMany();
    const productReviewData = product_review.map((product_review) => ({
      id: Number(product_review.id),
      productId: Number(product_review.productId),
      title: product_review.title,
      rating: product_review.rating,
      content: product_review.content,
      createAt: product_review.createAt,
      updateAt: product_review.updateAt
    }));

    return NextResponse.json({ data: productReviewData });
  } catch (error) {
    console.error("Error fetching product review:", error);
    await prisma.$disconnect();
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch product review",
      error: error.message,
      statusCode: 500,
    });
  }
}

export async function POST(req, res) {
  const prisma = new PrismaClient();
  try {
    const reqBody = await req.json();
    await prisma.product_Review.create({
      data: {
        productId: reqBody.productId,
        title: reqBody.title,
        rating: reqBody.rating,
        content: reqBody.content,
        createAt: new Date()
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully Product Review Created",statusCode: 200});
  } catch (error) {
    return NextResponse.json({
      status: "Error",
      message: "Failed to create a new Product Review",
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
    await prisma.product_Review.update({
      where:{id:reqBody.id},
      data: {
        productId: reqBody.productId,
        title: reqBody.title,
        rating: reqBody.rating,
        content: reqBody.content,
        updateAt: new Date()
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully Product Review Updated",statusCode: 200});
  } catch (error) {
    return NextResponse.json({
      status: "Error",
      message: "Failed to update a new Product Review",
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
    await prisma.product_Review.delete({
      where:{id:reqBody.id}
    });
    return NextResponse.json({status: "Success", message: "Successfully Product Review Deleted",statusCode: 200});
  } catch (error) {
    return NextResponse.json({ status: "Error", message: "Failed to delete a new category", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}
