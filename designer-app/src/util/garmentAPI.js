import prisma from "@/util/db";

// TODO: create DAOs?

/**
 * @param {string} userId
 * @param {string} garmentId
 */
export async function validateGarmentOwner(userId, garmentId) {
  const garment = await prisma.garment.findUnique({
    where: { id: garmentId },
  });

  const numCollections = await prisma.collection.count({
    where: {
      AND: [{ id: garment.collectionId }, { userId }],
    },
  });

  if (numCollections > 0) return garment;
}
