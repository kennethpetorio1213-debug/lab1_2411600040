<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$dataFile = __DIR__ . '/../json/exercises.json';

// GET - retrieve all exercises
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode([]);
    }
    exit;
}

// POST - update a single exercise's sessionsCompleted (simulates logging a session)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || !isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request']);
        exit;
    }

    $exercises = json_decode(file_get_contents($dataFile), true);

    $updated = null;
    foreach ($exercises as &$ex) {
        if ($ex['id'] == $input['id']) {
            $ex['sessionsCompleted'] = $input['sessionsCompleted'];
            $updated = $ex;
        }
    }

    file_put_contents($dataFile, json_encode($exercises, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true, 'updated' => $updated]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);