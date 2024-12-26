import { getSession } from "./session";
import { formatCurrency } from "./utils";

export async function fetchLatestDocuments() {}

export async function fetchCardData() {
  //   try {
  //     return {
  //       numberOfCustomers,
  //       numberOfInvoices,
  //       totalPaidInvoices,
  //       totalPendingInvoices,
  //     };
  //   } catch (error) {
  //     console.error('Database Error:', error);
  //     throw new Error('Failed to fetch card data.');
  //   }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredDocuments(query, currentPage) {
  const documents = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      image_url: "/john.jpg",
      amount: 120.5,
      date: "2024-12-18T10:00:00Z",
      status: "Paid",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image_url: "/jane.jpg",
      amount: 250.75,
      date: "2024-12-17T15:30:00Z",
      status: "Pending",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      image_url: "/alice.jpg",
      amount: 89.99,
      date: "2024-12-16T09:45:00Z",
      status: "Overdue",
    },
  ];
  
  return documents
}

export async function fetchAllDocuments(currentPage) {
  try {
    const session = await getSession()
    const response = await fetch("http://localhost:8000/api/documents", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${session.token}`,
        "Content-Type": "application/json"
      }
    }) 
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const result = await response.json()
    console.log("documents: ", result)
    return result.data
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to fetch documents.');
  }
}

export async function fetchDocumentsPages(query) {
   // Generate a random integer between 1 and 10
  //  const randomValue = Math.floor(Math.random() * 10) + 1;
   return 1;
}

export async function fetchDocumentsById(id) {}

export async function fetchCustomers() {}

export async function fetchFilteredCustomers(query) {
  // Generate 5 random customers
  const customers = generateRandomCustomers(5);
  console.log(customers);
  return customers;
}

function generateRandomCustomers(count) {
  const names = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Charlie Davis",
  ];
  const emails = [
    "john@gmail.com",
    "jane@gmail.com",
    "alice@yahoo.com",
    "bob@hotmail.com",
    "charlie@outlook.com",
  ];
  const images = [
    "/john.jpg",
    "/jane.jpg",
    "/alice.jpg",
    "/bob.jpg",
    "/charlie.jpg",
  ];

  const customers = [];

  for (let i = 1; i <= count; i++) {
    const randomIndex = Math.floor(Math.random() * names.length);
    const totalPaid = (Math.random() * 1000).toFixed(2); // Random total paid
    const totalPending = (Math.random() * 500).toFixed(2); // Random total pending

    customers.push({
      id: i,
      name: names[randomIndex],
      email: emails[randomIndex],
      image_url: images[randomIndex],
      total_paid: `$${totalPaid}`,
      total_pending: `$${totalPending}`,
    });
  }

  return customers;
}
