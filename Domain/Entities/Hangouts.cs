using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities.User;

namespace Domain.Entities
{
    public class Hangout
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime PlannedDate { get; set; }
        public string Location { get; set; } = string.Empty;
        public int MaxParticipants { get; set; }
        public decimal? EstimatedCost { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
        
        // Foreign key
        public int CreatedByUserId { get; set; }
        
        // Navigation properties
        public virtual YallaOutingUser CreatedBy { get; set; }
        public virtual ICollection<HangoutParticipant>? Participants { get; set; }
    }
}
