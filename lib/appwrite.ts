import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

//online
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.logicfables.seasavers",
  project: "66b0afe1000ab420e1c9",
  databaseId: "66fd7910001ed3369034",
  userCollectionId: "670378ea001d91b26686",
  eventCollectionId: "6704fb7c001f9b71da21",
  requestCollectionId: "6704fd230004142fc914",
};

const { endpoint, platform, project, databaseId, userCollectionId, eventCollectionId, requestCollectionId } = appwriteConfig;

//localhost
// export const appwriteConfig = {
//   endpoint: "http://192.168.8.127:8081/v1",
//   platform: "com.logicfables.seasavers",
//   project: "6703b11c0011e872f7eb",
//   databaseId: "6703b5360021482c4264",
//   userCollectionId: "",
// };

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.project)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);

// Register user
export async function createUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    console.log(newAccount.$id);

    const avatarUrl = avatars.getInitials(username);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
        role: "user",
      }
    );

    await signIn(email, password);

    return newUser;
  } catch (error) {
    throw new Error(String(error));
  }
}

// Sign In
export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(String(error));
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(String(error));
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Is Admin
export async function isAdmin() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    return currentUser.role === "admin";
  } catch (error) {
    throw new Error(String(error));
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(String(error));
  }
}


//Add Event
export async function addEvent(
  form: {
    title: string;
    description: string;
    date: string;
    location: string;
    time: string;
    organizer: string;
    type: string;
  }
) {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error;
    const newEvent = await databases.createDocument(
      databaseId,
      eventCollectionId,
      ID.unique(),
      {
        title: form.title,
        description: form.description,
        date: form.date,
        location: form.location,
        time: form.time,
        organizer: form.organizer,
        type: form.type,
        createdBy: user.$id,
      }
    );

    return newEvent;
  } catch (error) {
    throw new Error(String(error));
  }
}

//update Event
export async function updateEvent(
  id: string,
  title: string,
  description: string,
  date: Date,
  location: string,
  time: Date,
  organizer: string,
  type: string,
) {
  try {
    const updatedEvent = await databases.updateDocument(
      appwriteConfig.databaseId,
      "6703b5e0001f1f3e2e3b",
      id,
      {
        title: title,
        description: description,
        date: date,
        location: location,
        time: time,
        organizer: organizer,
        type: type
      }
    );

    return updatedEvent;
  } catch (error) {
    throw new Error(String(error));
  }
}

//add Request
export async function addRequest(
  fullName: string,
  email: string,
  phone: string,
  description: string,
  organizer: string,
) {
  try {
    const newRequest = await databases.createDocument(
      databaseId,
      "6703b5",
      ID.unique(),
      {
        fullName: fullName,
        email: email,
        phone: phone,
        description: description,
        organizer: organizer,
      }
    );

    return newRequest;
  } catch (error) {
    throw new Error(String(error));
  }
}

//get all events
export async function getEvents() {
  try {
    const events = await databases.listDocuments(
      databaseId,
      eventCollectionId,
      []
    );
    return events.documents;
  } catch (error) {
    throw new Error(String(error));
  }
}