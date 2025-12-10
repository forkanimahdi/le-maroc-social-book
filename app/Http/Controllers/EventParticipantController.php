<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventParticipantRequest;
use App\Mail\EventRegistrationMail;
use App\Models\EventParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EventParticipantController extends Controller
{
    public function store(EventParticipantRequest $request)
    {
        $validated = $request->validated();
        
        // Create participant
        $participant = EventParticipant::create([
            'full_name' => $validated['full_name'],
            'role' => $validated['role'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'status' => 'pending',
        ]);

        // Send registration confirmation email
        try {
            Mail::to($participant->email)->send(new EventRegistrationMail($participant));
        } catch (\Exception $e) {
            Log::error('Failed to send event registration email: ' . $e->getMessage());
        }

        return back()->with('success', 'Votre demande d\'inscription a été enregistrée avec succès.');
    }

    public function downloadCalendar($id)
    {
        $participant = EventParticipant::findOrFail($id);

        // Event details
        $eventTitle = "Événement de lancement - Le Maroc Social 2030";
        $eventDescription = "Lancement du livre « Le Maroc Social 2030 » par Oumaima Mhijir.\n\nVotre présence compte beaucoup pour incarner l'engagement collectif que nous souhaitons insuffler à travers ce projet.";
        $eventLocation = "Galerie d'Art \"La Tour Anis\", Les Tours Végétales, Casablanca Finance City";
        $eventStartDateTime = "20260128T173000";
        $eventEndDateTime = "20260128T193000";
        
        // Generate unique ID for the event
        $uid = md5($participant->email . $eventStartDateTime) . '@ms2030.org';
        
        // Create .ics content
        $icsContent = "BEGIN:VCALENDAR\r\n";
        $icsContent .= "VERSION:2.0\r\n";
        $icsContent .= "PRODID:-//Le Maroc Social 2030//Event Calendar//FR\r\n";
        $icsContent .= "CALSCALE:GREGORIAN\r\n";
        $icsContent .= "METHOD:REQUEST\r\n";
        $icsContent .= "BEGIN:VEVENT\r\n";
        $icsContent .= "UID:" . $uid . "\r\n";
        $icsContent .= "DTSTAMP:" . gmdate('Ymd\THis\Z') . "\r\n";
        $icsContent .= "DTSTART:" . $eventStartDateTime . "\r\n";
        $icsContent .= "DTEND:" . $eventEndDateTime . "\r\n";
        $icsContent .= "SUMMARY:" . $this->escapeIcsText($eventTitle) . "\r\n";
        $icsContent .= "DESCRIPTION:" . $this->escapeIcsText($eventDescription) . "\r\n";
        $icsContent .= "LOCATION:" . $this->escapeIcsText($eventLocation) . "\r\n";
        $icsContent .= "GEO:33.5731;-7.5898\r\n"; // Casablanca coordinates
        $icsContent .= "ORGANIZER;CN=Oumaima Mhijir:MAILTO:mhijiroum@gmail.com\r\n";
        $icsContent .= "ATTENDEE;CN=" . $this->escapeIcsText($participant->full_name) . ";RSVP=TRUE:MAILTO:" . $participant->email . "\r\n";
        $icsContent .= "STATUS:CONFIRMED\r\n";
        $icsContent .= "SEQUENCE:0\r\n";
        $icsContent .= "BEGIN:VALARM\r\n";
        $icsContent .= "TRIGGER:-P1D\r\n";
        $icsContent .= "ACTION:DISPLAY\r\n";
        $icsContent .= "DESCRIPTION:Rappel: Événement de lancement demain\r\n";
        $icsContent .= "END:VALARM\r\n";
        $icsContent .= "END:VEVENT\r\n";
        $icsContent .= "END:VCALENDAR\r\n";

        return response($icsContent, 200)
            ->header('Content-Type', 'text/calendar; charset=utf-8')
            ->header('Content-Disposition', 'attachment; filename="evenement-lancement-ms2030.ics"');
    }

    private function escapeIcsText($text)
    {
        $text = str_replace('\\', '\\\\', $text);
        $text = str_replace(',', '\\,', $text);
        $text = str_replace(';', '\\;', $text);
        $text = str_replace("\n", '\\n', $text);
        return $text;
    }
}

