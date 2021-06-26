var fs = require('fs');
var Handlebars = require('handlebars');
var CWD = process.cwd();
let path = require("path");
// let data = require('./reference-sample-data').data;
let { data, frameworkMap } = require('./reference-sample-data');
var siteConfig = null;
function getRenderFunction(filename, data) {
  var source = fs.readFileSync(filename, 'utf8').toString();
  var template = Handlebars.compile(source);
  var output = template(data);
  return output;
}

//var listPage = ["", "Pure JS", "Angular", "React", "Vue"];

function registerPartialListCss(templatePrefix) {
  var partialListCss = getRenderFunction(path.join(templatePrefix, 'PARTIAL_list_css.hbs'));
  Handlebars.registerPartial("partialListCss", partialListCss);
}
function registerPartialListScript(templatePrefix) {
  var partialListScript = getRenderFunction(path.join(templatePrefix, 'PARTIAL_list_script.hbs'));
  Handlebars.registerPartial("partialListScript", partialListScript);
}
function registerPartialDetailCss(templatePrefix) {
  var partialListCss = getRenderFunction(path.join(templatePrefix, 'PARTIAL_details_css.hbs'));
  Handlebars.registerPartial("partialDetailCss", partialListCss);
}
function registerPartialDetailScript(templatePrefix) {
  var partialListCss = getRenderFunction(path.join(templatePrefix, 'PARTIAL_details_script.hbs'));
  Handlebars.registerPartial("partialDetailScript", partialListCss);
}

function resolveDataPath(dataArray, referenceSamplePrefix) {
  return dataArray.map(item => {
    return {
      origin: item,
      completePath: path.posix.join(referenceSamplePrefix, item.path),
      completeImagePath: path.posix.join(referenceSamplePrefix, item.image)
    };
  });
}
function getListPage(frameworkDir, pathsPrefix) {
  var frameworkData = frameworkDir === "" ? data : data.filter(item => item.framework.indexOf(frameworkDir) > -1);
  var frameworkListData = Object.keys(frameworkMap).filter(k => !!k).map(k => {
    return {
      framework:k, 
      frameworkDisplayName: frameworkMap[k]
    };
  });

  var partialItem = getRenderFunction(path.join(pathsPrefix.templatePrefix, 'PARTIAL_sample-list.hbs'), { data: resolveDataPath(frameworkData, pathsPrefix.referenceSamplePrefix) });
  Handlebars.registerPartial("partialList", partialItem);
  // 'framework' is a display name here
  return getRenderFunction(path.join(pathsPrefix.templatePrefix, 'sample-list-layout.hbs'), { isAllpage: frameworkDir === "", framework: frameworkMap[frameworkDir],  frameworkListData: frameworkListData});
}
function getDetailPage(sampleData, pathsPrefix) {
  let runData = [];
  let downloadData = [];
  sampleData.framework.forEach((fw) => {
    runData.push(
      {
        runPath: path.posix.join(pathsPrefix.referenceSamplePrefix, sampleData.path, fw, 'dist'),
        framework: frameworkMap[fw],
      });
  });
  sampleData.framework.forEach((fw) => {
    downloadData.push(
      {
        downloadPath: path.posix.join(pathsPrefix.referenceSamplePrefix, sampleData.path, fw, 'sourcecode.zip'),
        framework: frameworkMap[fw],
        filename: `${sampleData.name}-${fw}-sourcecode.zip`
      });
  });
  return getRenderFunction(path.join(pathsPrefix.templatePrefix, 'sample-details-layout.hbs'),
    {
      logo: siteConfig.logo,
      sampleData: sampleData,
      runData: runData,
      downloadData: downloadData,
      redirectURL: `${pathsPrefix.referenceSamplePrefix}#${sampleData.name}`,
      completeImagePath: path.posix.join(pathsPrefix.referenceSamplePrefix, sampleData.image)
    });
}

function getPathsPrefix(config) {
  let listPagePrefix = path.join(CWD, config.demoroot, config.defaultCulture, 'feature-samples', 'samples', 'reference-samples');
  let templatePrefix = path.join(__dirname, 'templates');
  let detailPagePrefix = path.join(CWD, config.demoroot, config.defaultCulture, 'reference-samples');
  var referenceSamplePrefix = path.posix.join(config.demoBasePath, 'reference-samples');
  return {
    listPagePrefix: listPagePrefix,
    templatePrefix: templatePrefix,
    detailPagePrefix: detailPagePrefix,
    referenceSamplePrefix: referenceSamplePrefix
  }
}
function generateReferenceSamplePage(config) {
  siteConfig = config;

  let pathsPrefix = getPathsPrefix(config);

  //generate list page
  registerPartialListCss(pathsPrefix.templatePrefix);
  registerPartialListScript(pathsPrefix.templatePrefix);
  //var frameworks = listPage;
  //frameworks.forEach(fw => {
  var frameworks = Object.keys(frameworkMap);
  frameworks.forEach(fw => {
    var fwDir = fw;
    if (fw !== "") {
      fwDir = `fw-${fw}`

      //alexi
      //let folderPath = path.join(pathsPrefix.listPagePrefix, fw.split(' ').join("").toLocaleLowerCase());
      let folderPath = path.join(pathsPrefix.listPagePrefix, fwDir);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
      }
    }

    //alexi
    //var listPagePath = fw === "" ? path.join(pathsPrefix.listPagePrefix, 'index.html') : path.join(pathsPrefix.listPagePrefix, fw.split(' ').join("").toLocaleLowerCase(), 'index.html');
    var listPagePath = fw === "" ? path.join(pathsPrefix.listPagePrefix, 'index.html') : path.join(pathsPrefix.listPagePrefix, fwDir, 'index.html');
    if (!fs.existsSync(path.dirname(listPagePath))){
        fs.mkdirSync(path.dirname(listPagePath));
    }
    //alexi
    fs.writeFileSync(listPagePath, getListPage(fw, pathsPrefix), 'utf-8');
  });

  //generate detail page
  registerPartialDetailCss(pathsPrefix.templatePrefix);
  registerPartialDetailScript(pathsPrefix.templatePrefix);
  data.forEach(sample => {

    var htmlPath = path.join(pathsPrefix.detailPagePrefix, sample.name, "index.html");
    if (!fs.existsSync(path.dirname(htmlPath))){
      fs.mkdirSync(path.dirname(htmlPath));
    }
    fs.writeFileSync(htmlPath, getDetailPage(sample, pathsPrefix), 'utf-8');
  });
}

module.exports = {
  generateReferenceSamplePage: generateReferenceSamplePage
} 