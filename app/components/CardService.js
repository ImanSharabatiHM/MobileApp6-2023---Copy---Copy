import React, { useState,useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Switch,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';
import colors from "../config/colors";
import Icon from "../components/Icon";
import { ListItem, ListItemSeparator } from "../components/lists";
import servicesApi from "../api/service";
import RequestApi from "../api/request";

//import for the collapsible/Expandable view
import Collapsible from 'react-native-collapsible';
import Text from "./Text";

//import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';

function CardService({days,code,title,docs,steps,masar,subTitle,imageUrl,base64,date,status,notes, unitno,imageHeight = 300, onPress,thumbnailUrl,}) 
{
   // Ddefault active selector
   console.log(code);
  const [activeSections, setActiveSections] = useState([]);
  // Collapsed condition for the single collapsible
  const [collapsed, setCollapsed] = useState(true);
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  const [masarTxt, setMasarTxt] = useState("");

  const[servieName,setServiceName] = useState(title);
  const [numberOfDays, setnumberOfDays] =  useState({ loading: false,data:days});
  const [requiredDocuments, setRequiredDocuments] =  useState({ loading: false,
    data:docs
    /* [
      {ID:"1",RequestDocument:"صورة عن اثبات شخصية",RequestDocumentDetails:""},
      {ID:"2",RequestDocument:"شهادة براءة ذمة من ضريبة الاملاك",RequestDocumentDetails:"احضار شهادة براءة ذمة من ضريبة الاملاك على العقار موضوع الطلب، في حال عدم التمكن من الحصول على الشهادة يمكنكم مراجعة البلدية للمساعدة."},
      {ID:"3",RequestDocument:"تفويض رسمي أو وكالة دورية",RequestDocumentDetails:"يجب الحضور الشخصي لمقدم الطلب او حضور المفوض عنه بناء على تفويض رسمي يتم من خلال البلدية بحضور الطرفين او بموجب وكالة دورية ."},
      {ID:"4",RequestDocument:"اثبات علاقة بالعقار",RequestDocumentDetails:"احضار اثبات علاقة بالعقار مثل عقد الايجار في حال كان مستاجر او طابو او رخصة بناء او ما يدل على علاقته بالعقار ."},
      {ID:"6",RequestDocument:"شهادة عدم ممانعة من الحكم المحلي",RequestDocumentDetails:"في حال كان الموقع خارج حدود البلدية يجب احضار شهادة عدم ممانعة من الحكم المحلي ومخطط الموقع."},
      {ID:"7",RequestDocument:"كتاب عدم ممانعة من البلدية",RequestDocumentDetails:"في حال كان الموقع تابع لحدود بلدية أخرى يجب احضار كتاب عدم ممانعة من البلدية ."},

       
    ]*/
   });

    const [requestSteps, setRequestSteps] =  useState({ loading: false,
      data:steps
      /* [
        {ID:"1",RequestStep:"براءة ذمة بلدية وكهرباء",RequestStepDetails:"التوجه لمركز الخدمات للحصول على براءة ذمة من البلدية والكهرباء"},
        {ID:"2",RequestStep:"تحديد موقع الخدمة",RequestStepDetails:"تحديد رقم الوحدة المراد طلب الخدمة لها."},
        {ID:"3",RequestStep:"ارفاق الوثائق",RequestStepDetails:""},
        {ID:"4",RequestStep:"ادراج الطلب ضمن منظومة الطلبات والتوقيع .",RequestStepDetails:""},
        {ID:"5",RequestStep:"تقديم طلب رخص حرف وصناعات",RequestStepDetails:".في حال كان الاشتراك تجاري يلزم تقديم طلب رخصة حرف وصناعات"} 
         
      ] */
    });
      const [masars, setMasar] =  useState({ loading: false,data:masar
      /*[{"RequestMasar":"1111","ID":1},
      {"RequestMasar":"1eee111","ID":2},
      {"RequestMasar":"11rrrr11","ID":3},
      {"RequestMasar":"111fffff1","ID":4}   
    ]*/
       /* " خدمات الجمهور -> الابنية (كشف على ترخيص البناء) -> الصرف الصحي"+
        " -> كهرباء الخليل (يتم إنشاء الطلب) ->  نظم المعلومات الجغرافية(تحديث بيانات الاشتراك )"
      */
      });
       

  const toggleExpanded = () => {
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };
  const createMasar=()=>
  {


   
    var a="";
    for(let i=0;i<masars.data.length()-1;i++)
    a=a+masars.data[i].RequestMasar+" -> ";


    a=a+masars.data[masars.data.length()-1].RequestMasar+" -> ";
    console.log(a);
    setMasarTxt(a);
    console.log(masarTxt);

  }

  const handleServices = async () => {

  };

  useEffect(() => {
    createMasar();
   // handleServices();
 
   }, []);
  
  const toggleExpanded1 = () => {
    //Toggling the state of single Collapsible
    setCollapsed1(!collapsed1);
  };
  const toggleExpanded3 = () => {
    //Toggling the state of single Collapsible
    setCollapsed3(!collapsed3);
  };

  const toggleExpanded2 = () => {
    //Toggling the state of single Collapsible
    setCollapsed2(!collapsed2);
  };
  const setSections = (sections) => {
    //setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

 

  return (
    
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>
          {servieName}
          </Text>

          {/*Code for Single Collapsible Start*/}
          <TouchableOpacity onPress={toggleExpanded}>
          <ListItem
              title="> الوثائق المطلوبة"
              onPress={toggleExpanded}
              listStyle={styles.drawerItemPrimary}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'file'} localIcon={false} size={40} color={"#bbb"} />
              }
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed} align="center">
            {<View style={styles.content}>
              {requiredDocuments.data?.map((item, index) => {
                return (
                  <View>
                    <ListItem                     
                      key={"DOC"+item.ID}
                      title={item.RequestDocument}
                      subTitleVisible={item.RequestDocumentDetails==""?false:true}
                      subTitle={item.RequestDocumentDetails}
                      onPress={() => {                        
                        }}
                      listStyle={styles.drawerItem}
                      textStyle={styles.drawerTextStyleBlack}
                    />
                    <ListItemSeparator seperatorStyle={styles.seperatorStyle} />
                  </View>
                );
              }
              )}
            </View>
            }
           
          </Collapsible>
          <ListItemSeparator seperatorStyle={styles.seperator} />


           {/*Code for Single Collapsible Start*/}
           <TouchableOpacity onPress={toggleExpanded1}>
           <ListItem
              title="> الخطـوات"
              onPress={toggleExpanded1}
              listStyle={styles.drawerItemSecondaryLight}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'stairs'} localIcon={false} size={40} color={"#bbb"} />
              }
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed1} align="center">
            <View style={styles.content}>
            {<View style={styles.content}>
              {requestSteps.data?.map((item, index) => {
                return (
                  <View>
                    <ListItem 
                      key={"STEP"+item.ID}
                      title={(index+1)+"- "+item.RequestStep }
                      subTitleVisible={item.RequestStepDetails==""?false:true}
                      subTitle={item.RequestStepDetails}
                      onPress={() => {                        
                        }}
                      listStyle={styles.drawerItem}
                      textStyle={styles.drawerTextStyleBlack}
                    />
                    <ListItemSeparator seperatorStyle={styles.seperatorStyle} />
                  </View>
                );
              }
              )}
            </View>
            }
           
            </View>
          </Collapsible>

          <ListItemSeparator seperatorStyle={styles.seperator} />

           {/*Code for Single Collapsible Start*/}
           <TouchableOpacity onPress={toggleExpanded2}>
           <ListItem
              title="> المســار"
              onPress={toggleExpanded2}
              listStyle={styles.drawerItemPrimary}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'sitemap'} localIcon={false} size={40} color={"#bbb"} />
              }
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed2} align="center">
            <View style={styles.content}>
              <Text style={{ textAlign: 'center' }}>
               {masarTxt}
              </Text>
            </View>
          </Collapsible>
          
          
                     {/*Code for Single Collapsible Start*/}
          <TouchableOpacity onPress={toggleExpanded3}>
           <ListItem
              title="> الوقت المقدر للطلب"
              onPress={toggleExpanded3}
              listStyle={styles.drawerItemSecondaryLight}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'av-timer'} localIcon={false} size={40} color={"#bbb"} />
              }
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed3} align="center">
            <View style={styles.content}>
              <Text style={{ textAlign: 'center' }}>
              يحتاج الطلب ليمر في المسار المذكور {numberOfDays.data} يوم حتى إتمامه  .
              </Text>
            </View>
          </Collapsible>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default CardService;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    marginHorizontal: 20,
    paddingTop:15,
  },
  seperator: {
    backgroundColor: colors.seperator,
    marginVertical: .5,
    marginHorizontal: 20,
    height: 0.2,
  },
  title: {
    textAlign: 'center',
    fontSize:20,
    fontFamily:'Cairo_700Bold',
    color:colors.danger,
     marginBottom: 20,
  },
  header: {
    backgroundColor:colors.primary,
    padding: 10,
    
  },
  header1: {
    backgroundColor:colors.secondaryLight,
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    color:colors.white
  },
  content: {
    padding: 10,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
   },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
  drawerItemPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
  },
  drawerItemSecondaryLight: {
    backgroundColor: colors.secondaryLight,
    paddingVertical: 12,
  },
  drawerTextStyle: {
    color: colors.white,
    //fontWeight: "bold",
    fontSize: 20,
  },
  drawerTextStyleBlack: {
    color: colors.primaryDark,
    //fontWeight: "bold",
    fontSize: 14,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
const SELECTORS = [
  { title: 'T&C', value: 0 },
  { title: 'Privacy Policy', value: 1 },
  { title: 'Return Policy', value: 2 },
  { title: 'Reset all' },
];
