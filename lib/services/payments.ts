export async function createPaymentRequest(formData: FormData) {
  const response = await fetch("/api/payments", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Unable to create payment request");
  return response.json();
}

