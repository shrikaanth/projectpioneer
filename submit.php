<?php
// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Load Composer's autoloader
// NOTE: You must run 'composer install' in the project root for this to work
if (file_exists('vendor/autoload.php')) {
    require 'vendor/autoload.php';
} else {
    die("Error: Vendor folder not found. Please run 'composer install' to install dependencies.");
}

// Include Database Connection
require_once 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Collect and sanitize input data
    $full_name = htmlspecialchars(strip_tags(trim($_POST['full_name'])));
    $phone = htmlspecialchars(strip_tags(trim($_POST['phone'])));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $service_needed = htmlspecialchars(strip_tags(trim($_POST['service_needed'])));
    $city = htmlspecialchars(strip_tags(trim($_POST['city'])));
    $project_details = htmlspecialchars(strip_tags(trim($_POST['project_details'])));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }

    // 2. Insert into Database
    $sql = "INSERT INTO contact_submissions (full_name, phone, email, service_needed, city, project_details) 
            VALUES (?, ?, ?, ?, ?, ?)";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ssssss", $full_name, $phone, $email, $service_needed, $city, $project_details);
        
        if (!$stmt->execute()) {
            // Log error but continue to send email
            error_log("Database insertion failed: " . $stmt->error);
        }
        $stmt->close();
    } else {
        error_log("Database preparation failed: " . $conn->error);
    }
    
    $conn->close();

    // 3. Send Email via SMTP using PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;             // Enable verbose debug output
        $mail->isSMTP();                                      // Send using SMTP
        $mail->Host       = 'smtp.hostinger.com';             // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                             // Enable SMTP authentication
        $mail->Username   = 'no-reply@projectspioneer.com';   // SMTP username
        $mail->Password   = 'MarketingPPCguru@2026';          // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;      // Enable SSL encryption
        $mail->Port       = 465;                              // TCP port to connect to

        // Recipients
        $mail->setFrom('no-reply@projectpioneer.com', 'Project Pioneer Website');
        $mail->addAddress('projects.pioneer.construction@gmail.com');       // Add a recipient
        $mail->addReplyTo($email, $full_name);                // Reply to the customer

        // Content
        $mail->isHTML(false);                                 // Set email format to plain text
        $mail->Subject = "New Quote Request from " . $full_name;
        
        $message_body = "You have received a new quote request:\n\n";
        $message_body .= "Name: " . $full_name . "\n";
        $message_body .= "Phone: " . $phone . "\n";
        $message_body .= "Email: " . $email . "\n";
        $message_body .= "Service Needed: " . $service_needed . "\n";
        $message_body .= "City: " . $city . "\n";
        $message_body .= "Project Details:\n" . $project_details . "\n";
        
        $mail->Body = $message_body;

        $mail->send();
        
    } catch (Exception $e) {
        // Log email error
        error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    }

    // 4. Redirect to Thank You page
    header("Location: thank-you.html");
    exit();

} else {
    header("Location: contact.html");
    exit();
}
?>
