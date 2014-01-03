angular.module('gimmiehunter.user.scorecard_model', 
  ['gimmiehunter.default.model',
    'gimmiehunter.user.scorecard_resource'
  ]
  ).factory("ScorecardModel",["Model", "ScorecardResource", 
    function(Model, ScorecardResource){
      var scorecardModel = new Model({}, ScorecardResource);
      scorecardModel.stopwords = ["a","the","-","this","it","a's", "able", "about", "above", "according", "accordingly", "across", "actually", "after", "afterwards", "again", "against", "ain't", "all", "allow", "allows", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "an", "and", "another", "any", "anybody", "anyhow", "anyone", "anything", "anyway", "anyways", "anywhere", "apart", "appear", "appreciate", "appropriate", "are", "aren't", "around", "as", "aside", "ask", "asking", "associated", "at", "available", "away", "awfully", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "believe", "below", "beside", "besides", "best", "better", "between", "beyond", "both", "brief", "but", "by", "c'mon", "c's", "came", "can", "can't", "cannot", "cant", "cause", "causes", "certain", "certainly", "changes", "clearly", "co", "com", "come", "comes", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", "corresponding", "could", "couldn't", "course", "currently", "definitely", "described", "despite", "did", "didn't", "different", "do", "does", "doesn't", "doing", "don't", "done", "down", "downwards", "during", "each", "edu", "eg", "eight", "either", "else", "elsewhere", "enough", "entirely", "especially", "et", "etc", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "exactly", "example", "except", "far", "few", "fifth", "first", "five", "followed", "following", "follows", "for", "former", "formerly", "forth", "four", "from", "further", "furthermore", "get", "gets", "getting", "given", "gives", "go", "goes", "going", "gone", "got", "gotten", "greetings", "had", "hadn't", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "he's", "hello", "help", "hence", "her", "here", "here's", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "hi", "him", "himself", "his", "hither", "hopefully", "how", "howbeit", "however", "i'd", "i'll", "i'm", "i've", "ie", "if", "ignored", "immediate", "in", "inasmuch", "inc", "indeed", "indicate", "indicated", "indicates", "inner", "insofar", "instead", "into", "inward", "is", "isn't", "it", "it'd", "it'll", "it's", "its", "itself", "just", "keep", "keeps", "kept", "know", "knows", "known", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "let's", "like", "liked", "likely", "little", "look", "looking", "looks", "ltd", "mainly", "many", "may", "maybe", "me", "mean", "meanwhile", "merely", "might", "more", "moreover", "most", "mostly", "much", "must", "my", "myself", "name", "namely", "nd", "near", "nearly", "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", "nine", "no", "nobody", "non", "none", "noone", "nor", "normally", "not", "nothing", "novel", "now", "nowhere", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "on", "once", "one", "ones", "only", "onto", "or", "other", "others", "otherwise", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "own", "particular", "particularly", "per", "perhaps", "placed", "please", "plus", "possible", "presumably", "probably", "provides", "que", "quite", "qv", "rather", "rd", "re", "really", "reasonably", "regarding", "regardless", "regards", "relatively", "respectively", "right", "said", "same", "saw", "say", "saying", "says", "second", "secondly", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sensible", "sent", "serious", "seriously", "seven", "several", "shall", "she", "should", "shouldn't", "since", "six", "so", "some", "somebody", "somehow", "someone", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specified", "specify", "specifying", "still", "sub", "such", "sup", "sure", "t's", "take", "taken", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that's", "thats", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "there's", "thereafter", "thereby", "therefore", "therein", "theres", "thereupon", "these", "they", "they'd", "they'll", "they're", "they've", "think", "third", "this", "thorough", "thoroughly", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "twice", "two", "un", "under", "unfortunately", "unless", "unlikely", "until", "unto", "up", "upon", "us", "use", "used", "useful", "uses", "using", "usually", "value", "various", "very", "via", "viz", "vs", "want", "wants", "was", "wasn't", "way", "we", "we'd", "we'll", "we're", "we've", "welcome", "well", "went", "were", "weren't", "what", "what's", "whatever", "when", "whence", "whenever", "where", "where's", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "who's", "whoever", "whole", "whom", "whose", "why", "will", "willing", "wish", "with", "within", "without", "won't", "wonder", "would", "would", "wouldn't", "yes", "yet", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves", "zero"];
      scorecardModel.parseHumble = function(ascents){
        var braveAndHumble = 0;
        var numberChaser = 0;
        var normal = 0;
        for(var i = 0; i<ascents.length; i++){
          var ascent = ascents[i];
          if(ascent.braveAndHumble){
            braveAndHumble+=1;
          }
          else if(ascent.numberChaser){
            numberChaser+=1;
          }
          else{
            normal+=1;
          }
        }
        var humbleCount = [
          {
            type: "braveAndHumble",
            number: braveAndHumble
          },
          {
            type: "numberChaser",
            number: numberChaser
          },
          {
            type: "normal",
            number: normal
          }
        ];

        return {
          status: "OK",
          data: humbleCount
        };
      }

      scorecardModel.hardMan = function(ascents) {
        var data = [];
        var hardestGrade = "4a";

        for(var i = 0; i<ascents.length; i++){
          var ascent = ascents[i]; 
          var grade = ascent.grade;
          hardestGrade = this.biggerGrade(hardestGrade, grade);
        }

        var secondHardestGrade = "4a";
        for(var i = 0; i<ascents.length; i++){
          var ascent = ascents[i]; 
          var grade = ascent.grade;
          if(grade !== hardestGrade){
            secondHardestGrade = this.biggerGrade(secondHardestGrade, grade);
          }
        }

        for(var i = 0; i<ascents.length; i++){
          var ascent = ascents[i]; 
          var grade = ascent.grade;
          if(grade === hardestGrade || grade === secondHardestGrade){
            var area = ascent.route.area;
            var found = false;
            for(var j = 0 ; j < data.length ; j++){
              var areaCountObj = data[j];
              if (areaCountObj.type === area){
                found = true;
                areaCountObj.number ++;
              }
            }
            if(found === false){
              data.push({
                type: area,
                number: 1
              })
            }
          }
        }
        return {
          status: "OK",
          data: data
        }

      }

      scorecardModel.ascentsByArea = function(ascents){
        var data = []
        for(var i = 0; i<ascents.length; i++){
          var ascent = ascents[i]; 
          var grade = ascent.grade;
          var area = ascent.route.area;
          var found = false;
          for(var j = 0 ; j < data.length ; j++){
            var areaCountObj = data[j];
            if (areaCountObj.type === area){
              found = true;
              areaCountObj.number ++;
            }
          }
          if(found === false){
            data.push({
              type: area,
              number: 1
            })
          }          
        }
        return {
          status: "OK",
          data: data
        }
      }

      scorecardModel.commentWords = function(ascents){
        var words = []
        for(var i = 0; i< ascents.length; i++){
          var ascent = ascents[i];
          var comment = ascent.comment
          var commentWords = comment.split(/[ ,]+/);
          for (var j = 0; j< commentWords.length; j++){
            var commentWord = commentWords[j].toLowerCase();
            if(this.stopwords.indexOf(commentWord)<0){
              var found = false;
              for(var k = 0; k <words.length; k++){
                var wordObj = words[k];
                if(wordObj.name === commentWord){
                  found = true;
                  wordObj.count ++;
                }
              }
              if(found == false){
                words.push({
                  name: commentWord,
                  count: 1
                })
              }

            }
          }
        }

        return {
          status: "OK",
          data: words
        }
      }

      scorecardModel.biggerGrade = function(grade1, grade2){
        var grade1Number = parseInt(grade1.substring(0,1))
        var grade2Number = parseInt(grade2.substring(0,1))
        if(grade1Number > grade2Number){
          return grade1;
        }
        if(grade2Number > grade1Number){
          return grade2;
        }
        var letters = ["a","b","c"];
        var grade1LetterIndex = letters.indexOf(grade1.substring(1,2));
        var grade2LetterIndex = letters.indexOf(grade2.substring(1,2));
        if(grade1LetterIndex > grade2LetterIndex){
          return grade1;
        }
        if (grade2LetterIndex > grade1LetterIndex){
          return grade2;
        }
        var plus = ["","+"];
        var grade1PlusIndex = plus.indexOf(grade1.substring(2,3))
        var grade2PlusIndex = plus.indexOf(grade2.substring(2,3))
        if(grade1PlusIndex > grade2PlusIndex){
          return grade1;
        }
        if (grade2PlusIndex > grade1PlusIndex){
          return grade2;
        }
        return grade1
      }
      return scorecardModel;
    }
  ]
);