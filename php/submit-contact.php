<?php
 require_once './PHPMailer/src/PHPMailer.php';
 require_once './PHPMailer/src/SMTP.php';
 require_once './PHPMailer/src/Exception.php';
 
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;

session_start();
require_once 'config.php';

// if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on') {
//     header('Location: https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
//     exit;
// }

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../contact.html');
    exit;
}

// SECURITY: Rate Limiting
if (!isset($_SESSION['submission_count'])) {
    $_SESSION['submission_count'] = 0;
    $_SESSION['first_submission_time'] = time();
}

$time_elapsed = time() - $_SESSION['first_submission_time'];
if ($time_elapsed < 3600 && $_SESSION['submission_count'] >= MAX_SUBMISSIONS_PER_SESSION) {
    die('Too many submissions. Please try again later.');
}

// SECURITY: Honeypot (Bot Detection)
if (!empty($_POST['website'])) {
    header('Location: ../contact.html?success=1');
    exit;
}

// Get and Sanitize Form Data
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$interest = trim($_POST['interest'] ?? '');
$message = trim($_POST['message'] ?? '');
$privacy = isset($_POST['privacy']) ? true : false;

// Validation
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Please enter your name';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email';
}

if (empty($interest)) {
    $errors[] = 'Please select what you are interested in';
}

if (empty($message)) {
    $errors[] = 'Please enter a message (at least 10 characters)';
}

if (!$privacy) {
    $errors[] = 'Please agree to the privacy policy';
}

// Check for suspicious content
if (preg_match('/<script|javascript:|on\w+=/i', $message)) {
    $errors[] = 'Invalid message content';
}

if (!empty($errors)) {
    $_SESSION['form_errors'] = $errors;
    $_SESSION['form_data'] = $_POST;
    header('Location: ../contact.html?error=validation');
    exit;
}

// Database Connection
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        throw new Exception('Database connection failed');
    }
    
    $conn->set_charset('utf8mb4');
    
    // Save to Database (Prepared Statement)
    $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, interest, message) VALUES (?, ?, ?, ?, ?)");
    
    if (!$stmt) {
        throw new Exception('Database error');
    }
    
    $stmt->bind_param("sssss", $name, $email, $phone, $interest, $message);
    
    if (!$stmt->execute()) {
        throw new Exception('Failed to save message');
    }
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    error_log('Contact form database error: ' . $e->getMessage());
    header('Location: ../contact.html?error=database');
    exit;
}

// Send Email via Gmail SMTP
try {
   
    $mail = new PHPMailer(true);
    
    // Server settings
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = SMTP_PORT;
    
    // Recipients
    $mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
    $mail->addAddress(ADMIN_EMAIL, ADMIN_NAME);
    $mail->addReplyTo($email, $name);
    
    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New Contact Form Submission - NTDS';
    
    $emailBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #6A0DAD; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #333; }
            .value { color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Name:</div>
                    <div class='value'>" . htmlspecialchars($name) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>" . htmlspecialchars($email) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Phone:</div>
                    <div class='value'>" . htmlspecialchars($phone ?: 'Not provided') . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Interest:</div>
                    <div class='value'>" . htmlspecialchars($interest) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $mail->Body = $emailBody;
    $mail->AltBody = "New Contact Form Submission\n\nName: $name\nEmail: $email\nPhone: $phone\nInterest: $interest\n\nMessage:\n$message";
    
    $mail->send();
    
} catch (Exception $e) {
    error_log('Email sending failed: ' . $mail->ErrorInfo);
    // Don't fail the whole process if email fails, data is already saved
}

// Update Rate Limiting
$_SESSION['submission_count']++;

// Success Redirect
header('Location: ../contact.html?success=1');
exit;
?>
