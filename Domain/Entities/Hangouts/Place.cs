using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Hangouts
{
    internal class Place
    {
        int Id { get; set; }

        string Name { get; set; }

        string Descreption { get; set; }

        string ImageURI { get; set; }

        int Rating { get; set; }

        int CordX { get; set; }

        int CordY { get; set; }


    }
}
