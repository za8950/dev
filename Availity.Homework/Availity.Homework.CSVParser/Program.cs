using CsvHelper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Availity.Homework.CSVParser
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Intake csv file");
            
            TextReader reader = new StreamReader(@"Import/enrollees.csv");
            var csvReader = new CsvReader(reader);
            var records = csvReader.GetRecords<Enrollee>().ToList();

            var groupByInsCompany = records
                                    .GroupBy(u => u.InsuranceCompany)
                                    .Select(grp => grp.ToList())
                                    .ToList();

            groupByInsCompany.ForEach(items => {
                Create(items);
            });

            Console.WriteLine("Press ENTER to exit...");
            Console.ReadLine();
        }

        private static void Create(IEnumerable<Enrollee> items)
        {
            var fileName = $"{items.FirstOrDefault().InsuranceCompany}-Enrollees.csv";
            var path = $@"C:/export/{fileName}";

            Directory.CreateDirectory(Path.GetDirectoryName(path));

            var distinctItems = items.GroupBy(x => x.UserId)
                                .Select(y => y.OrderByDescending(z => z.Version).First()).ToList();

            using (var writer = new StreamWriter(path))
            using (var csv = new CsvWriter(writer))
            {
                csv.WriteRecords(distinctItems.OrderBy(x => x.LastName).ThenBy(y => y.FirstName));
            }
        }
    }
}
