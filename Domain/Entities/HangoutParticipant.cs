using Domain.Entities.User;

namespace Domain.Entities
{
    public class HangoutParticipant
    {
        public int Id { get; set; }
        public int HangoutId { get; set; }
        public int UserId { get; set; }
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
        public bool IsConfirmed { get; set; } = false;
        
        // Navigation properties
        public virtual Hangout Hangout { get; set; }
        public virtual YallaOutingUser User { get; set; }
    }
}