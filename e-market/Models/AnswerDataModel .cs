using System;
using System.Collections.Generic;

namespace e_market.Models
{
    public class AnswerDataModel
    {
        public AnswerDataModel()
        {

            SubQuestionAnswers = new HashSet<AnswerDataModel>();
        }
        public Guid Id { get; set; }

        public Guid QuestionId { get; set; }

        public string Value { get; set; }

        public virtual ICollection<AnswerDataModel> SubQuestionAnswers { get; set; }
    }
}
