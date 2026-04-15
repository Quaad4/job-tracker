<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company' => $this->company,
            'role' => $this->role,
            'status' => $this->status,
            'date_applied' => $this->date_applied->format('d-m-Y'),
            'notes' => $this->notes,
            'salary_min' => $this->salary_min,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
