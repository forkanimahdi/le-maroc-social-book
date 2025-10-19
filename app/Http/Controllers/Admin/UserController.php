<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = \App\Models\User::withCount(['ideas', 'groupSignups'])
            ->orderBy('created_at', 'desc')
            ->get();
            
        $ideas = \App\Models\Idea::with('user')
            ->orderBy('created_at', 'desc')
            ->get();
            
        $groupSignups = \App\Models\GroupSignup::with('user')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('admin/users', [
            'users' => $users,
            'ideas' => $ideas,
            'groupSignups' => $groupSignups
        ]);
    }
    
    public function moderateIdea(Request $request, $id)
    {
        $request->validate([
            'action' => 'required|in:approve,reject'
        ]);
        
        $idea = \App\Models\Idea::findOrFail($id);
        $idea->update([
            'status' => $request->action === 'approve' ? 'approved' : 'rejected'
        ]);
        
        return redirect()->back()->with('success', 'Idée modérée avec succès !');
    }
    
    public function confirmGroupSignup(Request $request, $id)
    {
        $request->validate([
            'action' => 'required|in:confirm,reject'
        ]);
        
        $signup = \App\Models\GroupSignup::findOrFail($id);
        
        if ($request->action === 'confirm') {
            $signup->update(['status' => 'confirmed']);
            // Here you would send WhatsApp link or confirmation email
        } else {
            $signup->update(['status' => 'rejected']);
        }
        
        return redirect()->back()->with('success', 'Inscription traitée avec succès !');
    }
    
    public function exportUsers()
    {
        $users = \App\Models\User::all();
        
        $csvData = [
            ['Nom', 'Email', 'Type', 'Date d\'inscription', 'Statut', 'Idées', 'Groupes']
        ];
        
        foreach ($users as $user) {
            $csvData[] = [
                $user->name,
                $user->email,
                $user->type ?? 'subscriber',
                $user->created_at->format('Y-m-d'),
                $user->status ?? 'active',
                $user->ideas_count ?? 0,
                $user->group_signups_count ?? 0,
            ];
        }
        
        $filename = 'users-' . date('Y-m-d') . '.csv';
        
        $callback = function() use ($csvData) {
            $file = fopen('php://output', 'w');
            foreach ($csvData as $row) {
                fputcsv($file, $row);
            }
            fclose($file);
        };
        
        return response()->stream($callback, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
