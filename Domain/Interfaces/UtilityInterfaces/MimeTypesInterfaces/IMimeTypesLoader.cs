using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.UtilityInterfaces.MimeTypesInterfaces
{
    public interface IMimeTypesLoader
    {
        IReadOnlyDictionary<string, string> LoadMimeTypes();
    }
}
