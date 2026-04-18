<?php

namespace Tests\Feature;

use App\Models\Application;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApplicationControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a user for all tests
        $this->user = User::factory()->create();
    }

    /**
     * test to retrieve all applications from db
     */
    public function test_index_returns_all_applications(): void
    {
        Application::factory()->count(3)->create(['user_id' => $this->user->id]);

        $response = $this->getJson('/api/applications');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }


    /**
     * test to retrieve all applications from db
     */
    public function test_index_returns_filtered_applications(): void
    {
        Application::factory()->count(3)->create(['user_id' => $this->user->id, 'status' => 'applied']);
        Application::factory()->count(3)->create(['user_id' => $this->user->id, 'status' => 'interview']);
        Application::factory()->count(3)->create(['user_id' => $this->user->id, 'status' => 'offer']);
        Application::factory()->count(3)->create(['user_id' => $this->user->id, 'status' => 'rejected']);

        $interviewed = $this->getJson('/api/applications?status=interview');

        $interviewed->assertStatus(200);
        $interviewed->assertJsonCount(3, 'data');
    }

    /**
     * test to store an application in the db
     */
    public function test_store_creates_a_new_application(): void
    {
        $payload = [
            'user_id' => $this->user->id,
            'company' => 'Test Company',
            'role' => 'Manager',
            'status' => 'applied',
            'date_applied' => '2026-04-18',
            'notes' => 'Blah',
            'salary_min' => 38000
        ];

        $response = $this->postJson('/api/applications', $payload);

        $response->assertStatus(201);
        $response->assertJsonFragment(['company' => 'Test Company']);

        // Confirm it is in the DB
        $this->assertDatabaseHas('applications', ['company' => 'Test Company', 'user_id' => $this->user->id]);
    }

    /**
     * test to validate store request requires fields
     */
    public function test_store_validates_required_fields(): void
    {
        $response = $this->postJson('/api/applications', []);
        
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['company', 'role', 'status', 'date_applied']);
    }
        
    /**
     * test to fetch an application in the db
     */
    public function test_show_returns_a_single_application(): void
    {
        $application = Application::factory()->create(['user_id' =>$this->user->id]);

        $response = $this->getJson("/api/applications/{$application->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => $application->id]);
    }

    /**
     * test to validate 404 is returned if application not found
     */
    public function test_show_returns_404_for_missing_application(): void
    {
        $response = $this->getJson('/api/applications/9999');

        $response->assertStatus(404);
    }

    /**
     * test to update an application in the db
     */
    public function test_update_modifies_an_existing_application(): void
    {
        $application = Application::factory()->create(['company' => 'Old Name', 'user_id' => $this->user->id]);

        $response = $this->putJson("/api/applications/{$application->id}", [
            'company' => 'New Name',
            'role' => $application->role,
            'status' => $application->status,
            'date_applied' => $application->date_applied,
            'notes' => $application->notes,
            'salary_min' => $application->salary_min
        ]); 

        $response->assertStatus(200);
        $response->assertJsonFragment(['company' => 'New Name']);
        $this->assertDatabaseHas('applications', ['company' => 'New Name', 'user_id' => $this->user->id]);
    }

    /**
     * test to validate update request requires fields
     */
    public function test_update_validates_required_fields(): void
    {
        $application = Application::factory()->create(['company' => 'Old Name', 'user_id' => $this->user->id]);

        $response = $this->putJson("/api/applications/{$application->id}", []);
        
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['company', 'role', 'status', 'date_applied']);
    }

    /**
     * test to delete an application in the db
     */
    public function test_destroy_deletes_an_application(): void
    {
        $application = Application::factory()->create(['user_id' => $this->user->id]);

        $response = $this->deleteJson("/api/applications/{$application->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('applications', ['id' => $application->id, 'user_id' => $this->user->id]);
    }

    /**
     * test user relationship on application model
     */
    public function test_user_relationship_on_application_model(): void
    {
        $user = User::factory()->create();
        $application = Application::factory()->create(['user_id' => $user->id]);

        $relatedUser = $application->user;

        $this->assertInstanceOf(User::class, $relatedUser);
        $this->assertEquals($user->id, $relatedUser->id);
    }
}
