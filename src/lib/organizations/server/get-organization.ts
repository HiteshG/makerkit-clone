import admin from "@/lib/firebaseAdmin";

export async function getOrganizationById(organizationId: string) {
  const firestore = admin.firestore();
  const docRef = firestore.collection("organizations").doc(organizationId);

  try {
    const organization = await docRef.get();
    if (organization.exists) {
      const organizationData = { id: organization.id, ...organization.data() };
      return organizationData;
    } else {
      console.log("No such organization!");
    }
  } catch (error) {
    console.log(error);
  }
}
