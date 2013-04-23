/*
 * CMS - CKeditor Plugin - v0.0.1
 * https://github.com/MOFB/ckeditor-plugin-cms
 * Copyright (c) 2013 Master Of Bits, LLC. Licensed MIT
 */
CKEDITOR.plugins.add('cms', {
	init: function(editor) {
        editor.addCommand('editMetaData',  new CKEDITOR.dialogCommand('editMetaDataDialog') );
        editor.ui.addButton('CMS', {
            label:    'Page Meta Data',
            command: 'editMetaData',
            icon:    this.path + 'images/cms.png'
        });
	}
});
CKEDITOR.dialog.add('editMetaDataDialog', function(editor)
{
    return {
        title:     'CMS Page Properties',
        minWidth:  400,
        minHeight: 200,
        contents:
        [
            {
                id :    'general',
                label : 'General',
                elements :
                [
                    {
                        type: 'html',
                        html: '<p>The name will be used for internal purposes only. This will not be displayed publicly.</p>'
                    },
                    {
                        type:     'text',
                        id:       'name',
                        label:    'Name',
                        validate: CKEDITOR.dialog.validate.notEmpty('The page must have a valid name.'),
                        required: true
                    },
                    {
                        type: 'html',
                        html: '<p>If this CMS page will be accessible directly by URL provide a unique URL below otherwise leave blank.</p>'
                    },
                    {
                        type:  'text',
                        id:    'url',
                        label: 'URL'
                    },
                    {
                        type:  'select',
                        id:    'enabled',
                        label: 'Status of this CMS page',
                        items:
                        [
                            ['Enabled',  '1' ],
                            ['Disabled', '0' ],
                        ],
                    }
                ]
            },
            {
                id:      'metadata',
                label:   'Meta data',
                elements:
                [
                    {
                        type:    'text',
                        id:      'title',
                        label:   'Title',
                        validate: CKEDITOR.dialog.validate.notEmpty('The page must have a valid title.'),
                        required: true
                    },
                    {
                        type:  'textarea',
                        id:    'description',
                        label: 'Description'
                    },
                    {
                        type:  'textarea',
                        id:    'keywords',
                        label: 'Keywords'
                    }
                ]
            }
        ],
        onOk: function () {
            var dia = this;
            $.each(['name','url','enabled'], function(i, name) {
                $('input[name="'+name+'"]').val(dia.getValueOf('general',  name));
                $('.ckeditor_info .'+name+' span').html( dia.getValueOf('general', name));
            });
            $.each(['title','description','keywords'], function(i, name) {
                $('input[name="'+name+'"]').val(dia.getValueOf('metadata',  name));
                $('.ckeditor_info .'+name+' span').html( dia.getValueOf('metadata', name));
            });
            
            $('.cke_button__save').removeClass('saved').addClass('not_saved');
            CKEDITOR_CHANGED = true;
            CKEDITOR_TAB = false;
        },
        onCancel: function () {
            CKEDITOR_TAB = false;
        },
        onShow: function () {
            var dia = this;
            $.each(['name','url','enabled'], function(i, name) {
                dia.setValueOf('general',  name, $('input[name="'+name+'"]').val());
            });
            $.each(['title','description','keywords'], function(i, name) {
                dia.setValueOf('metadata',  name, $('input[name="'+name+'"]').val());
            });
            if (CKEDITOR_TAB) {
                this.selectPage(CKEDITOR_TAB);
            }
        }
    };
});
