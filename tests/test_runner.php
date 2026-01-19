<?php
/**
 * Automated Test Runner for Contact Form
 * Uses cURL to simulate form submissions to localhost:8000
 */

$baseUrl = "http://localhost:8000/submit.php";

echo "Starting Automated Tests on $baseUrl...\n";
echo "----------------------------------------\n";

// Helper function to send POST request
function send_post($url, $data) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    // Do not follow redirects, so we can check the Location header
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false); 
    curl_setopt($ch, CURLOPT_HEADER, true); // Include headers in output
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return ['code' => $httpCode, 'response' => $response];
}

// TEST 1: Valid Submission
echo "Test 1: Valid Submission... ";
$validData = [
    'full_name' => 'Test User',
    'phone' => '1234567890',
    'email' => 'test@example.com',
    'service_needed' => 'Other',
    'city' => 'Toronto',
    'project_details' => 'Automated test submission'
];

$res1 = send_post($baseUrl, $validData);

// We expect a 302 Redirect to thank-you.html
if ($res1['code'] == 302) {
    if (strpos($res1['response'], 'Location: thank-you.html') !== false) {
        echo "[PASS]\n";
    } else {
        echo "[FAIL] - Redirected but not to thank-you.html\n";
        // echo $res1['response'];
    }
} else {
    echo "[FAIL] - Expected HTTP 302, got {$res1['code']}\n";
    if ($res1['code'] == 0) {
        echo "       (Is the local server running on port 8000?)\n";
    }
}

// TEST 2: Invalid Email
echo "Test 2: Invalid Email... ";
$invalidData = $validData;
$invalidData['email'] = 'not-an-email';

$res2 = send_post($baseUrl, $invalidData);

// We expect execution to stop with "Invalid email format"
// Status might be 200 (default for die()) or 500 depending on config, but definitely NOT 302
if ($res2['code'] != 302) {
    if (strpos($res2['response'], 'Invalid email format') !== false) {
        echo "[PASS]\n";
    } else {
        echo "[FAIL] - Error message not found. Got:\n" . substr($res2['response'], 0, 100) . "\n";
    }
} else {
    echo "[FAIL] - Request was redirected regardless of invalid email.\n";
}

echo "----------------------------------------\n";
echo "Tests Completed.\n";
?>
