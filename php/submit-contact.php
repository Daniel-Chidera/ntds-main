<?php
// ============================================
// NTDS - Contact Form Handler (Sample)
// Replace with your actual PHP logic
// ============================================

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$interest = isset($_POST['interest']) ? trim($_POST['interest']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$privacy = isset($_POST['privacy']) ? true : false;

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

if (empty($interest)) {
    $errors[] = 'Please select what you are interested in';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

if (!$privacy) {
    $errors[] = 'You must agree to the privacy policy';
}

// If there are errors, redirect back with error message
if (!empty($errors)) {
    // Store errors in session or redirect with query params
    $_SESSION['form_errors'] = $errors;
    $_SESSION['form_data'] = $_POST;
    header('Location: contact.html?error=validation');
    exit;
}

// If validation passes, process the form

// Example 1: Send Email
$to = 'hello@ntds.com';
$subject = 'New Contact Form Submission - NTDS';
$email_message = "
Name: $name
Email: $email
Phone: $phone
Interest: $interest

Message:
$message
";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
mail($to, $subject, $email_message, $headers);

// Example 2: Save to Database
/*
$conn = new mysqli('localhost', 'username', 'password', 'database');

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, interest, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
$stmt->bind_param("sssss", $name, $email, $phone, $interest, $message);
$stmt->execute();
$stmt->close();
$conn->close();
*/

// Redirect to success page
header('Location: contact.html?success=1');
exit;
?>
